using Microsoft.Extensions.AI;

namespace ContentGeneration;

public class Chatter : IChatter
{
    private readonly IChatClient chatClient;
    private readonly SystemPromptBuilder _systemPromptBuilder;
    private readonly string defaultSystemPrompt = "write an insightful professional social media post reply in 20 words or less";
    
    List<ChatMessage> chatHistory = new();

    public Chatter(IChatClient chatClient)
    {
        this.chatClient = chatClient;
        _systemPromptBuilder = new SystemPromptBuilder();
    }

    public async Task<string> AnswerChatAsync(string prompt, string systemPrompt = null)
    {
        chatHistory.Add(new ChatMessage(ChatRole.System, systemPrompt ?? defaultSystemPrompt));
        chatHistory.Add(new ChatMessage(ChatRole.User, prompt));
        
        var assistantResponse = "";
        
        await foreach (var update in chatClient.GetStreamingResponseAsync(chatHistory))
        {
            Console.Write(update.Text);
            assistantResponse += update.Text;
        }
        
        return assistantResponse;
    }

    public async Task<string> GenerateContent(ContentRequestDto request)
    {
        var prompt = request.Post;
        var systemPrompt = _systemPromptBuilder.BuildSystemPrompt(request);

        return await AnswerChatAsync(prompt, systemPrompt);
    }
}