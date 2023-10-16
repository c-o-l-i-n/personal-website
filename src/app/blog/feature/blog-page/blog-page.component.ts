import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'colin-blog-page',
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent implements OnInit {
  readonly posts$: Observable<BlogPost[]> = this.scully.available$.pipe(
    map((routes) => routes as BlogPost[]),
    map((routes) =>
      routes
        .filter((route) => route.route.startsWith('/blog/'))
        .sort(sortBlogPostsByDate),
    ),
  );

  constructor(
    private scully: ScullyRoutesService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Blog');
  }
}
