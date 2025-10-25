using ContentGeneration;

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

        var chatterConfig = builder.Configuration.GetSection(ChatterConfigKey);

        builder.Services.AddChatter(chatterConfig);

        builder.Services.AddControllers();

        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseCors(corsPolicyBuilder => corsPolicyBuilder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
        );

        //app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        
        app.Run();
    }
}