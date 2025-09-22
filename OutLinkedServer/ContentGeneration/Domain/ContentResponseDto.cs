namespace ContentGeneration.Domain;

public record ContentResponseDto
{
    public required ContentType ContentType {get; set;}
    public required string GeneratedContent { get; init; }
}