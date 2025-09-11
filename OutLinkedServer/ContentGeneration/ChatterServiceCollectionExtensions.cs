using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using OllamaSharp;

namespace ContentGeneration;

public static class ChatterServiceCollectionExtensions
{
    public static IServiceCollection AddChatter(this IServiceCollection services)
    {
        services.AddSingleton<IChatClient>(new OllamaApiClient(new Uri("http://localhost:11434/"), "llama3.2:latest"));
        services.AddScoped<IChatter, Chatter>();

        return services;
    }
}