using ContentGeneration.Adapters;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OllamaSharp;

namespace ContentGeneration;

public static class ChatterServiceCollectionExtensions
{
    public static IServiceCollection AddChatter(this IServiceCollection services, OllamaOptions chatterConfiguration)
    {
        var configUri = chatterConfiguration.Uri;
        var configModel = chatterConfiguration.Model;
        services.AddSingleton<IOllamaApiClient>(new OllamaApiClient(new Uri(configUri), configModel));
        services.AddScoped<IChatter, Chatter>();

        return services;
    }
}