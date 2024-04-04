import { Component, input } from '@angular/core';
import { BlogPost } from '@colin/shared/util';

@Component({
  selector: 'colin-blog-post-card',
  templateUrl: './blog-post-card.component.html',
})
export class BlogPostCardComponent {
  post = input.required<BlogPost>();
  header = input<string>();
}
