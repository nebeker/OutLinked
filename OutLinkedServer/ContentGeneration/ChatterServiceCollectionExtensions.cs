using Microsoft.Extensions.AI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OllamaSharp;

namespace ContentGeneration;

public static class ChatterServiceCollectionExtensions
{
    private const string UriConfigKey = "Uri";
    private const string ModelConfigKey = "Model";
    private const string DefaultUri = "http://localhost:11434/";
    private const string DefaultModel = "llama3.2:latest";

    public static IServiceCollection AddChatter(this IServiceCollection services , IConfiguration chatterConfiguration)
    {
        var configUri = chatterConfiguration[UriConfigKey];
        var configModel = chatterConfiguration[ModelConfigKey];
        services.AddSingleton<IChatClient>(new OllamaApiClient(new Uri(configUri ?? DefaultUri),
            configModel?? DefaultModel));
        services.AddScoped<IChatter, Chatter>();

        return services;
    }
}