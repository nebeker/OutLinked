using ContentGeneration;
using Microsoft.AspNetCore.Mvc;

namespace OutLinkedServer.Controllers;

[ApiController]
[Route("[controller]")]
public class ContentGenerationController : ControllerBase
{
    private readonly IChatter _chatter;
    
    private readonly ILogger<ContentGenerationController> _logger;

    public ContentGenerationController(ILogger<ContentGenerationController> logger, IChatter chatter)
    {
        _logger = logger;
        _chatter = chatter;
    }

    [HttpGet(Name = "GetModel")]
    public string Get()
    {
        return "model";
    }

    public record ContentRequest
    {
        public string Text  { get; set; }
    }
    
    [HttpPost(Name = "GenerateFromText")]
    public async Task<string> Post([FromBody] ContentRequest request)
    {
        return await _chatter.AnswerChatAsync(request.Text);
    }
}