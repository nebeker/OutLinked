using ContentGeneration.Domain;

namespace ContentGeneration;

public interface IChatter
{
    Task<ContentResponseDto> GenerateContent(ContentRequestDto request);
}