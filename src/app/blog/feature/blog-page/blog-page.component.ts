import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'colin-blog-page',
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent implements OnInit {
  private readonly scully = inject(ScullyRoutesService);
  private readonly title = inject(Title);

  readonly posts$: Observable<BlogPost[]> = this.scully.available$.pipe(
    map((routes) => routes as BlogPost[]),
    map((routes) =>
      routes
        .filter((route) => route.route.startsWith('/blog/'))
        .sort(sortBlogPostsByDate),
    ),
  );

  ngOnInit(): void {
    this.title.setTitle('Blog');
  }
}
