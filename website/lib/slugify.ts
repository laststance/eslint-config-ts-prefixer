/**
 * Generate a URL-safe slug from heading text
 * Used for creating IDs from markdown heading content
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("TypeScript: The Basics") // "typescript-the-basics"
 * slugify("React & Next.js") // "react-nextjs"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, '') // Trim - from end
}
