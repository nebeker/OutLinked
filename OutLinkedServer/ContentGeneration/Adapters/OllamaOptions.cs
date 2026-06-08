namespace ContentGeneration.Adapters;

public sealed class OllamaOptions
{
    private const string DefaultUri = "http://localhost:11434/";
    private const string DefaultModel = "llama3.2:latest";

    public string Uri { get; set; } = DefaultUri;
    public string Model { get; set; } = DefaultModel;
}