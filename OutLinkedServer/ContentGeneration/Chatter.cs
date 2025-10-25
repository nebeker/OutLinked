using ContentGeneration.Domain;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Logging;

namespace ContentGeneration;

public class Chatter : IChatter
{
    private readonly IChatClient chatClient;
    private readonly ILogger<Chatter> logger;
    private readonly SystemPromptBuilder _systemPromptBuilder;
    
    List<ChatMessage> chatHistory = new();

    public Chatter(IChatClient chatClient, ILogger<Chatter> logger)
    {
        this.chatClient = chatClient;
        this.logger = logger;
        _systemPromptBuilder = new SystemPromptBuilder();
        logger.LogInformation("Chatter initialized");
    }

    public async Task<string> AnswerChatAsync(string prompt, string systemPrompt)
    {
        logger.LogDebug("Generating response for prompt: {prompt}", prompt.Substring(0, Math.Min(prompt.Length, 50)));
        
        chatHistory.Add(new ChatMessage(ChatRole.System, systemPrompt));
        chatHistory.Add(new ChatMessage(ChatRole.User, prompt));
        
        var assistantResponse = "";
        
        await foreach (var update in chatClient.GetStreamingResponseAsync(chatHistory))
        {
            logger.LogTrace("Generated text: {text}", update.Text);
            assistantResponse += update.Text;
        }
        
        return assistantResponse;
    }

    public async Task<ContentResponseDto> GenerateContent(ContentRequestDto request)
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
            return (ContentResponseDto) null;
        }
    }
}