import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogPost } from '@colin/shared/util';

@Component({
  selector: 'colin-blog-post-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="post().route"
      [attr.aria-label]="'Go to blog post() titled ' + post().title"
      class="h-full"
    >
      <colin-card removeGap class="h-full bg-white" [header]="header()">
        <!-- Thumbnail -->
        <div
          class="h-48 w-full rounded-lg bg-cover bg-center"
          [class.mt-3]="header()"
          [ngStyle]="{ 'background-image': 'url(' + post().thumbnail + ')' }"
        ></div>

        <!-- Published Date -->
        <p class="mb-1 mt-3 text-sm">
          {{ post().publishedDate | date: 'mediumDate' : 'UTC' }}
        </p>

        <!-- Title -->
        <h3
          class="mb-1 font-mono text-xl font-medium leading-tight group-hover:underline"
        >
          {{ post().title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-slate-600">{{ post().description }}</p>
      </colin-card>
    </a>
  `,
})
export class BlogPostCardComponent {
  post = input.required<BlogPost>();
  header = input<string>();
}
