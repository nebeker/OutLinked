namespace ContentGeneration;

public record ContentRequestDto
{
    public required string Post {get; set;}
    public ContentType Type {get; set;}
    public string? AuthorIndustry {get; set;}
    public string? AuthorTitle { get; set; }
    public bool PlugEnabled {get; set;}
    public PlugOptionsDto? PlugOptions {get; set;}
        
    public enum ContentType
    {
        Repply = 1,
        Post  = 2,
    }

    public record PlugOptionsDto
    {
        public required string Type { get; set; }
        public required string Title { get; set; }
        public required string Url { get; set; }
    }
}