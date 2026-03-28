/** MIME type for HTML <source> from filename (videos in /resources). */
export function videoSourceMimeType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}
