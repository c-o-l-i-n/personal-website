import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPost, expandImageUrl } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'colin-blog-post-page',
  templateUrl: './blog-post-page.component.html',
})
export class BlogPostPageComponent {
  private readonly scully = inject(ScullyRoutesService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly post$: Observable<BlogPost> = this.scully.getCurrent().pipe(
    map((post) => post as BlogPost),
    tap((post) => {
      // title
      this.title.setTitle(post.title);
      this.meta.updateTag({ name: 'og:title', content: post.title });
      this.meta.updateTag({ name: 'twitter:title', content: post.title });
      this.meta.updateTag({ name: 'og:type', content: 'article' });
      this.meta.updateTag({ name: 'author', content: 'Colin Williams' });
      this.meta.updateTag({ name: 'description', content: post.description });
      this.meta.updateTag({
        name: 'article:published_time',
        content: post.publishedDate,
      });
      this.meta.updateTag({
        name: 'og:image',
        content: expandImageUrl(post.thumbnail),
      });
      this.meta.updateTag({
        name: 'twitter:card',
        content: 'summary_large_image',
      });
      this.meta.updateTag({
        name: 'twitter:creator',
        content: '@n0t_buddy',
      });
    }),
  );
}
