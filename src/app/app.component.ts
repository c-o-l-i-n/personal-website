import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { expandImageUrl } from './shared/util';

@Component({
  selector: 'colin-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content:
          "As a software engineer, I'm passionate about crafting exceptional user experiences, and Angular is where I truly shine.",
      },
      {
        name: 'og:image',
        content: expandImageUrl('/assets/images/placeholder.webp'),
      },
    ]);
  }
}
