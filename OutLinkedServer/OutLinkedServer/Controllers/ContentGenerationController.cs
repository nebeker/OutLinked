using ContentGeneration;
using ContentGeneration.Domain;
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
    
    [HttpPost(Name = "GenerateFromText")]
    public async Task<IActionResult> Post([FromBody] ContentRequestDto request)
    {
        if (request is { PlugEnabled: true, PlugOptions: null })
            return new BadRequestObjectResult("Plug options are required");
        var result = await _chatter.GenerateContent(request);
        return  new OkObjectResult(result);
    }
}