using ContentGeneration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddChatter();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors(corsPolicyBuilder => corsPolicyBuilder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
    );
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();