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

    public async Task<string> AnswerChatAsync(string prompt, string systemPrompt, string? model)
    {
        logger.LogDebug("Generating response for prompt: {prompt}", prompt.Substring(0, Math.Min(prompt.Length, 50)));

        GenerateRequest request = new();
        if (model != null)
        {
            request.Model = model;
            request.Prompt = prompt;
            request.System = systemPrompt;
            request.Stream = true;
            request.Raw = false;
        }
        else
        {
            request.Prompt = prompt;
            request.System = systemPrompt;
            request.Stream = true;
            request.Raw = false;
        }

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
        var model = request.Model;
        try
        {
            var content = await AnswerChatAsync(prompt, systemPrompt, model);
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

    public async Task<List<string>> GetAvailableModels()
    {
        var localModels = await chatClient.ListLocalModelsAsync();
        
        return localModels.Select(localModel => localModel.Name).ToList();
    }
}