import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'colin-footer',
  template: `
    <footer class="mb-6 mt-10 text-center text-slate-500">
      <p class="text-sm">&copy; 2024 Colin A. Williams</p>
      <div class="flex justify-center gap-2">
        <a
          class="p-2"
          routerLink="/github"
          target="_blank"
          aria-label="Colin's GitHub"
        >
          <fa-icon [icon]="faGithub" />
        </a>
        <a
          class="p-2"
          routerLink="/linkedin"
          target="_blank"
          aria-label="Colin's LinkedIn"
        >
          <fa-icon [icon]="faLinkedin" />
        </a>
        <a
          class="p-2"
          routerLink="/resume"
          target="_blank"
          aria-label="Colin's Resume"
        >
          <fa-icon [icon]="faFilePdf" />
        </a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly faGithub = faGithub;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faFilePdf = faFilePdf;
}
