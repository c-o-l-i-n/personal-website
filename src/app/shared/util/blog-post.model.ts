import { ScullyRoute } from '@scullyio/ng-lib';

export interface BlogPost extends ScullyRoute {
  title: string;
  description?: string;
  thumbnail: string;
  publishedDate: string;
  featured: boolean;
  tags?: string[];
}

export function sortBlogPostsByDate(a: BlogPost, b: BlogPost): number {
  return (
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
