import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { expandImageUrl } from './shared/util';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'colin-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  protected readonly faGithub = faGithub;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faFilePdf = faFilePdf;

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content:
          "As a software engineer, I'm passionate about crafting exceptional user experiences. Architecting robust Angular applications is where I truly shine.",
      },
      {
        name: 'og:image',
        content: expandImageUrl('/assets/images/placeholder.webp'),
      },
    ]);
  }
}
