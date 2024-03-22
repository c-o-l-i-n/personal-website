import { Injectable, inject } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { mockBlogPosts } from './mock-blog-posts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MockScullyRoutesService extends ScullyRoutesService {
  private readonly router2 = inject(Router);

  override available$: Observable<ScullyRoute[]> = of(mockBlogPosts);

  override getCurrent(): Observable<ScullyRoute> {
    return of(
      mockBlogPosts.find(
        (post) => post.route === this.router2.url,
      ) as ScullyRoute,
    );
  }
}
