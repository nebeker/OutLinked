namespace ContentGeneration.Domain;

public record PlugOptionsDto
{
    public required string Type { get; set; }
    public required string Title { get; set; }
    public required string Url { get; set; }
}