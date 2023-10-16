import { Component } from '@angular/core';
import { BlogPost } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'colin-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss'],
})
export class BlogPostPageComponent {
  readonly post$: Observable<BlogPost> =
    this.scully.getCurrent() as Observable<BlogPost>;

  constructor(private scully: ScullyRoutesService) {}
}
