const LOCAL_AUTHOR_IMAGES: Record<string, string> = {
  "iraj-pezeshkzad": "/assets/images/authors/iraj-pezeshkzad.webp",
  "bozorg-alavi": "/assets/images/authors/bozorg-alavi.webp",
  "zoya-pirzad": "/assets/images/authors/zoya-pirzad.webp",
  "paulo-coelho": "/assets/images/authors/paulo-coelho.webp",
  "abbas-maroufi": "/assets/images/authors/abbas-maroufi.webp",
};

export function getAuthorImagePath(
  slug: string,
  avatarUrl: string | null,
) {
  return avatarUrl ?? LOCAL_AUTHOR_IMAGES[slug] ?? null;
}
