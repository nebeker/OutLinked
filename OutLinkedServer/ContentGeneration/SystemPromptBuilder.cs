using System.Text;
using ContentGeneration.Domain;
using static System.String;
using static ContentGeneration.PromptSegments;

namespace ContentGeneration;

public class SystemPromptBuilder
{
    public string BuildSystemPrompt(ContentRequestDto request)
    {
        var sb = new StringBuilder();
        sb.Append(CopyPaste);
        if (request.Type == ContentType.Post)
            sb.Append(Post);
        if (request.Type == ContentType.Reply)
            sb.Append(Reply);
        if (!IsNullOrWhiteSpace(request.AuthorIndustry) &&
            !IsNullOrWhiteSpace(request.AuthorTitle))
            sb.Append(AuthorInfo
                .Replace(Placeholders.AuthorTitle, request.AuthorTitle)
                .Replace(Placeholders.AuthorIndustry, request.AuthorIndustry));
        if (request.PlugEnabled && !IsNullOrWhiteSpace(request.PlugOptions?.Type) &&
            !IsNullOrWhiteSpace(request.PlugOptions?.Title) && !IsNullOrWhiteSpace(request.PlugOptions.Url))
            sb.Append(PlugContent.Replace(Placeholders.PlugType, request.PlugOptions.Type)
                .Replace(Placeholders.PlugTitle, request.PlugOptions.Title)
                .Replace(Placeholders.PlugAddress, request.PlugOptions.Url));
        sb.Append(UserPromptSeparator);
        return sb.ToString();
    }
}