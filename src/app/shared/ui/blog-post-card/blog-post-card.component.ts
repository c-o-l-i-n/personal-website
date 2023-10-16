import { Component, Input } from '@angular/core';
import { BlogPost } from '@colin/shared/util';

@Component({
  selector: 'colin-blog-post-card',
  templateUrl: './blog-post-card.component.html',
})
export class BlogPostCardComponent {
  @Input({ required: true }) post!: BlogPost;
  @Input() header: string | undefined;
}
