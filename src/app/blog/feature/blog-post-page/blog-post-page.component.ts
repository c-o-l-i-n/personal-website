import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPost, expandImageUrl } from '@colin/shared/util';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs';

@Component({
  selector: 'colin-blog-post-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mb-24">
      <!-- Thumbnail -->
      <div
        class="my-10 aspect-video w-full rounded bg-cover bg-center"
        [ngStyle]="{ 'background-image': 'url(' + post().thumbnail + ')' }"
      ></div>

      <!-- Title -->
      <h1
        class="font-mono text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
      >
        {{ post().title }}
      </h1>

      <!-- Date -->
      <div class="text-sm leading-6">
        <dl>
          <dt class="sr-only">Date</dt>
          <dd class="text-slate-700">
            <time [attr.datetime]="post().publishedDate">{{
              post().publishedDate | date: 'fullDate' : 'UTC'
            }}</time>
          </dd>
        </dl>
      </div>

      <!-- Content -->
      <div class="content mt-8">
        <scully-content />
      </div>

      <div class="mt-16 flex flex-wrap gap-2">
        <!-- Tag Pills -->
        @for (tag of post().tags; track tag) {
          <colin-pill
            [model]="{
              text: tag,
              iconSrc: 'https://icon.icepanel.io/Technology/svg/' + tag + '.svg'
            }"
          />
        }
      </div>
    </article>
  `,
})
export class BlogPostPageComponent {
  private readonly scully = inject(ScullyRoutesService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly updateMetadata = effect(() => {
    this.title.setTitle(this.post().title);
    this.meta.updateTag({ name: 'og:title', content: this.post().title });
    this.meta.updateTag({ name: 'twitter:title', content: this.post().title });
    this.meta.updateTag({ name: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'author', content: 'Colin Williams' });
    this.meta.updateTag({
      name: 'description',
      content: this.post().description ?? this.post().title,
    });
    this.meta.updateTag({
      name: 'article:published_time',
      content: this.post().publishedDate,
    });
    this.meta.updateTag({
      name: 'og:image',
      content: expandImageUrl(this.post().thumbnail),
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:creator',
      content: '@n0t_buddy',
    });
  });

  readonly post = toSignal(
    this.scully.getCurrent().pipe(map((post) => post as BlogPost)),
    { requireSync: true },
  );
}
