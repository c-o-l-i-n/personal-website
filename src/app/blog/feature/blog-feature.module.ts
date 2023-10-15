import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { BlogPostPageComponent } from './blog-post-page/blog-post-page.component';

const routes: Routes = [
  {
    path: ':title',
    component: BlogPostPageComponent,
  },
  {
    path: '**',
    component: BlogPostPageComponent,
  },
];

@NgModule({
  declarations: [BlogPostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScullyContentModule,
    RouterModule,
  ],
})
export class BlogFeatureModule {}
