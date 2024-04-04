import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { expandImageUrl } from './shared/util';

@Component({
  selector: 'colin-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    class="mx-auto max-w-3xl bg-[url('/assets/images/bg.png')] bg-top bg-no-repeat px-4 py-5"
  >
    <!-- Header -->
    <colin-header />

    <!-- Page Content -->
    <router-outlet />

    <!-- Footer -->
    <colin-footer />
  </div> `,
})
export class AppComponent implements OnInit {
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content:
          "As a software engineer, I'm passionate about crafting exceptional user experiences. Architecting robust Angular applications is where I truly shine.",
      },
      {
        name: 'og:image',
        content: expandImageUrl('/assets/images/colin-banner.webp?v=1'),
      },
    ]);
  }
}
