import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostPageComponent } from './blog-post-page/blog-post-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { SharedUiModule } from '@colin/shared/ui';
import { MockScullyContentComponent } from './mock-scully-content/mock-scully-content.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
  },
  {
    path: ':title',
    component: BlogPostPageComponent,
  },
];

@NgModule({
  declarations: [
    BlogPostPageComponent,
    BlogPageComponent,
    MockScullyContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedUiModule,
  ],
})
export class BlogFeatureModule {}
