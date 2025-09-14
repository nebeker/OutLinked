namespace ContentGeneration;

public interface IChatter
{
    Task<string> AnswerChatAsync(string prompt, string systemPrompt = null);

    Task<string> GenerateContent(ContentRequestDto request);
}