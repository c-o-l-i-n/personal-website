import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  faBluesky,
  faGithub,
  faLinkedin,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

interface FooterLink {
  routerLink: string;
  ariaLabel: string;
  icon: IconDefinition;
}

@Component({
  selector: 'colin-footer',
  template: `
    <footer class="mb-6 mt-10 text-center text-slate-500">
      <p class="text-sm">&copy; 2024 Colin A. Williams</p>
      <div class="flex justify-center gap-2">
        <!-- Footer Links -->
        @for (footerLink of footerLinks; track $index) {
          <a
            class="p-2"
            [routerLink]="footerLink.routerLink"
            target="_blank"
            [attr.aria-label]="footerLink.ariaLabel"
          >
            <fa-icon [icon]="footerLink.icon" />
          </a>
        }
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly footerLinks: FooterLink[] = [
    {
      routerLink: '/github',
      ariaLabel: "Colin's GitHub",
      icon: faGithub,
    },
    {
      routerLink: '/bluesky',
      ariaLabel: "Colin's Bluesky",
      icon: faBluesky,
    },
    {
      routerLink: '/linkedin',
      ariaLabel: "Colin's LinkedIn",
      icon: faLinkedin,
    },
    {
      routerLink: '/resume',
      ariaLabel: "Colin's Resume",
      icon: faFilePdf,
    },
  ];
}
