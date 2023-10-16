import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPost, expandImageUrl } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'colin-blog-post-page',
  templateUrl: './blog-post-page.component.html',
})
export class BlogPostPageComponent {
  readonly post$: Observable<BlogPost> = this.scully.getCurrent().pipe(
    map((post) => post as BlogPost),
    tap((post) => {
      this.title.setTitle(post.title);
      this.meta.updateTag({ name: 'description', content: post.description });
      this.meta.updateTag({
        name: 'og:image',
        content: expandImageUrl(post.thumbnail),
      });
    }),
  );

  constructor(
    private scully: ScullyRoutesService,
    private title: Title,
    private meta: Meta,
  ) {}
}
