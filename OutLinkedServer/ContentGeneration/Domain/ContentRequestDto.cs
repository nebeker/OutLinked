namespace ContentGeneration.Domain;

public record ContentRequestDto
{
    public required string Post {get; set;}
    public ContentType Type {get; set;}
    public string? AuthorIndustry {get; set;}
    public string? AuthorTitle { get; set; }
    public bool PlugEnabled {get; set;}
    public PlugOptionsDto? PlugOptions {get; set;}
}