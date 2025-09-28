namespace ContentGeneration;

public static class PromptSegments
{
    public const string DefaultSystemPrompt = CopyPaste + Reply + UserPromptSeparator;

    public const string CopyPaste =
        "Your answer will be directly copied and pasted. You must not offer commentary, suggestions or options.";

    public const string Reply =
        "Write an insightful professional replyt to a professional social media post in 20 words or less. Start with a summary and add a piece of your own insight.";

    public const string Post =
        "Write an insightful professional social media post in 200 words or less in reference to the quoted post. Start with a summary and add your own insight in a way that subtly shows you're better than the original author.";

    public const string AuthorInfo =
        "You are an experienced {title} in the {indsutry} industry with vast knowledge in the field.";

    public const string PlugContent =
        "At the end, make sure readers check your {type} called {title} available at {address}.";

    public const string UserPromptSeparator = "Don't deivde your response into sections. The original post starts here:";

    public class Placeholders
    {
        public const string AuthorTitle = "{title}";
        public const string AuthorIndustry = "{indsutry}";
        public const string PlugType = "{type}";
        public const string PlugTitle = "{title}";
        public const string PlugAddress = "{address}";
    }
}