using ContentGeneration.Domain;
using Microsoft.Extensions.Logging;
using OllamaSharp;
using OllamaSharp.Models;

namespace ContentGeneration;

public class Chatter : IChatter
{
    private readonly IOllamaApiClient chatClient;
    private readonly ILogger<Chatter> logger;
    private readonly SystemPromptBuilder _systemPromptBuilder;
    
    public Chatter(IOllamaApiClient chatClient, ILogger<Chatter> logger)
    {
        this.chatClient = chatClient;
        this.logger = logger;
        _systemPromptBuilder = new SystemPromptBuilder();
        logger.LogInformation("Chatter initialized");
    }

    public async Task<string> AnswerChatAsync(string prompt, string systemPrompt)
    {
        logger.LogDebug("Generating response for prompt: {prompt}", prompt.Substring(0, Math.Min(prompt.Length, 50)));

        var request = new GenerateRequest
        {
            //Model = null,
            Prompt = prompt,
            System = systemPrompt,
            Stream = true,
            Raw = false
        };

        var assistantResponse = "";
        
        await foreach (var chunk in chatClient.GenerateAsync(request))
            assistantResponse += chunk?.Response;
        
        return assistantResponse;
    }

    public async Task<ContentResponseDto?> GenerateContent(ContentRequestDto request)
    {
        logger.LogDebug("Generating content for request: {request}", request.ToString());
        var prompt = request.Post;
        var systemPrompt = _systemPromptBuilder.BuildSystemPrompt(request);
        try
        {
            var content = await AnswerChatAsync(prompt, systemPrompt);
            return new ContentResponseDto
            {
                ContentType = request.Type,
                GeneratedContent = content,
                TimeGenerated = DateTime.UtcNow,
            };
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error generating content");
            return null;
        }
    }
}