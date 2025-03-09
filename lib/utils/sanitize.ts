import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Allows specific tags and attributes commonly used in rich text editors like Quill.
 *
 * @param {string} content - The raw HTML content to sanitize.
 * @returns {string} - The sanitized HTML content.
 */
export function sanitize(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p", "strong", "em", "u", "s", "span", "ul", "ol", "li",
      "a", "img", "h1", "h2", "h3", "blockquote", "pre", "code",
      "div", "br", "hr", "iframe"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "src", "alt", "title", "class", "width", "height", "frameborder", "allow", "allowfullscreen"
    ]
  });
}
