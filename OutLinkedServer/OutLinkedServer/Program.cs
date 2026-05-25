using ContentGeneration;
using ContentGeneration.Adapters;

namespace OutLinkedServer;

public static class Program
{
    private const string ChatterConfigKey = "Ollama";

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddLogging(configure => configure
            .AddConsole()
        );

        OllamaOptions chatterConfig = new();
        
        builder.Configuration.GetSection(nameof(OllamaOptions)).Bind(chatterConfig);
        
        builder.Services.AddChatter(chatterConfig);

        builder.Services.AddControllers();

        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseCors(corsPolicyBuilder => corsPolicyBuilder
            .WithMethods("GET", "POST")
            .AllowAnyHeader()
            .AllowAnyOrigin()
        );

        //app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        
        app.Run();
    }
}