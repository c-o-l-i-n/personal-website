import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { mockBlogPosts } from './mock-blog-posts';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockScullyRoutesService extends ScullyRoutesService {
  override available$: Observable<ScullyRoute[]> = of(mockBlogPosts);

  constructor(
    private router2: Router,
    http: HttpClient,
  ) {
    super(router2, http);
  }

  override getCurrent(): Observable<ScullyRoute> {
    return of(
      mockBlogPosts.find(
        (post) => post.route === this.router2.url,
      ) as ScullyRoute,
    );
  }
}
