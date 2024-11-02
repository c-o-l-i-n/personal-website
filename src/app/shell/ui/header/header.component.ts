import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'colin-header',
  template: `
    <nav
      class="mb-6 flex w-full flex-col items-center justify-between gap-4 md:flex-row"
    >
      <a
        routerLink="/"
        class="group flex w-max flex-col items-center justify-center gap-3 md:flex-row md:justify-start"
        aria-label="Go to Home page"
      >
        <!-- Avatar -->
        <img
          src="/assets/images/colin.webp?v=2"
          alt=""
          height="72"
          width="72"
          class="rounded-full"
        />
        <div class="text-center md:text-left">
          <!-- Name -->
          <p class="font-mono text-xl font-medium group-hover:underline">
            Colin Williams
          </p>
          <!-- Description -->
          <p>Software Engineer & Frontend Architect</p>
        </div>
      </a>

      <!-- Nav Links -->
      <div class="flex gap-7">
        <a
          routerLink="/"
          class="font-mono font-medium hover:underline"
          aria-label="Go to Home page"
          >Home</a
        >
        <a
          routerLink="/blog"
          class="font-mono font-medium hover:underline"
          aria-label="Go to Blog page"
          >Blog</a
        >
        <a
          routerLink="/contact"
          class="font-mono font-medium hover:underline"
          aria-label="Go to Contact page"
          >Contact</a
        >
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
