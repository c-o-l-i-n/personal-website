import { Component } from '@angular/core';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'colin-blog-page',
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent {
  readonly posts$: Observable<BlogPost[]> = this.scully.available$.pipe(
    map((routes) => routes as BlogPost[]),
    map((routes) =>
      routes
        .filter((route) => route.route.startsWith('/blog/'))
        .sort(sortBlogPostsByDate),
    ),
  );

  constructor(private scully: ScullyRoutesService) {}
}
