import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'colin-blog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <colin-card class="mb-5">
      <h1
        class="text-center font-mono text-2xl font-medium md:text-left md:text-3xl"
      >
        Blog
      </h1>
    </colin-card>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      @for (post of posts$ | async; track post.route) {
        <colin-blog-post-card [post]="post" />
      }
    </div>
  `,
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
