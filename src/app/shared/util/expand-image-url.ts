export function expandImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http')) return imageUrl;

  return 'https://colinaw.com/' + imageUrl;
}
