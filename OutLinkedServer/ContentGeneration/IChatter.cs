namespace ContentGeneration;

public interface IChatter
{
    Task<string> GenerateContent(ContentRequestDto request);
}