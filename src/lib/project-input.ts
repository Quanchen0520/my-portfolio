import type { GalleryItem } from "./projects";

function parseGallery(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && typeof (item as { src?: unknown }).src === "string"
    )
    .map((item) => ({
      type: item.type === "video" ? "video" : "image",
      src: item.src as string,
      alt: typeof item.alt === "string" ? item.alt : undefined,
      caption: typeof item.caption === "string" ? item.caption : undefined,
      poster: typeof item.poster === "string" ? item.poster : undefined,
    }));
}

export function parseProjectBody(body: unknown) {
  if (typeof body !== "object" || body === null) return null;

  const {
    slug,
    title,
    description,
    tech,
    type,
    icon,
    sort_order,
    image_url,
    role,
    timeline,
    highlights,
    demo_url,
    github_url,
    gallery,
  } = body as Record<string, unknown>;

  if (typeof slug !== "string" || typeof title !== "string") {
    return null;
  }

  return {
    slug,
    title,
    description: typeof description === "string" ? description : "",
    tech: Array.isArray(tech) ? (tech as string[]) : [],
    type: typeof type === "string" ? type : "web",
    icon: typeof icon === "string" ? icon : "compass",
    sort_order: typeof sort_order === "number" ? sort_order : undefined,
    image_url: typeof image_url === "string" && image_url ? image_url : null,
    role: typeof role === "string" && role ? role : null,
    timeline: typeof timeline === "string" && timeline ? timeline : null,
    highlights: Array.isArray(highlights) ? (highlights as string[]) : [],
    demo_url: typeof demo_url === "string" && demo_url ? demo_url : null,
    github_url: typeof github_url === "string" && github_url ? github_url : null,
    gallery: parseGallery(gallery),
  };
}
