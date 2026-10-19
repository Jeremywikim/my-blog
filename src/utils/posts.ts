import type { CollectionEntry } from 'astro:content';
import { READING_TAG } from '../consts';

export type Post = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 200;

const dateFormatter = new Intl.DateTimeFormat('en-IE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  // Dates in frontmatter are parsed as UTC midnight; format them in UTC so
  // they never shift to the previous day.
  timeZone: 'UTC',
});

export function postSlug(post: Post): string {
  return post.id.replace(/\.md$/, '');
}

export function postUrl(post: Post): string {
  return `/blog/${postSlug(post)}`;
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function isReadingNote(post: Post): boolean {
  return post.data.tags?.includes(READING_TAG) ?? false;
}

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Estimated reading time for raw Markdown body text, rounded up to whole minutes.
 * Counts whitespace-separated tokens that contain a letter or digit, so pure
 * Markdown syntax such as list markers and table separators is ignored.
 */
export function readingMinutes(body: string): number {
  const words = body
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
