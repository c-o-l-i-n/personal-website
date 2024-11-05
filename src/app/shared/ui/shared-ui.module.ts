import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostCardComponent } from './blog-post-card.component';
import { CardComponent } from './card.component';
import { PillComponent } from './pill.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [BlogPostCardComponent, CardComponent, PillComponent],
  imports: [CommonModule, RouterLink],
  exports: [BlogPostCardComponent, CardComponent, PillComponent],
})
export class SharedUiModule {}
