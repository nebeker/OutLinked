namespace ContentGeneration;

public interface IChatter
{
    Task<string> AnswerChatAsync(string prompt, string systemPrompt = null);
}