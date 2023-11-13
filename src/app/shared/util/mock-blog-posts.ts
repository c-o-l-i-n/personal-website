import { BlogPost } from './blog-post.model';

export const mockBlogPost1: BlogPost = {
  route: '/blog/mock-blog-post-1',
  title: 'Mock Blog Post 1',
  description: 'This is a fake blog post',
  thumbnail: '/assets/images/placeholder.webp',
  publishedDate: '2022-05-20',
  featured: true,
  tags: ['Angular'],
};

export const mockBlogPost2: BlogPost = {
  route: '/blog/mock-blog-post-2',
  title: 'Mock Blog Post 2',
  description: 'This is another fake blog post',
  thumbnail: '/assets/images/placeholder.webp',
  publishedDate: '2023-09-02',
  featured: false,
  tags: ['Firebase'],
};

export const mockBlogPosts: BlogPost[] = [mockBlogPost1, mockBlogPost2];
