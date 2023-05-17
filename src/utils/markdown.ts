import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

export const markdownIt = MarkdownIt({
    html: true,
    breaks: true,
    typographer: true,
    langPrefix: "language-",
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(str, { language: lang }).value;
        }
        return "";
    },
}).use(anchor);
