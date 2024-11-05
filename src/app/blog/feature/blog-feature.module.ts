import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostPageComponent } from './blog-post-page.component';
import { BlogPageComponent } from './blog-page.component';
import { SharedUiModule } from '@colin/shared/ui';
import { BlogUiModule } from '@colin/blog/ui';
import { environment } from '@environment';
import { ScullyContentModule } from '@scullyio/ng-lib';

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
  declarations: [BlogPostPageComponent, BlogPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedUiModule,
    ...(environment.production ? [ScullyContentModule] : [BlogUiModule]),
  ],
})
export class BlogFeatureModule {}
