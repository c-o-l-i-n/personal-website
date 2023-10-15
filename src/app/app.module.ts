import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/feature/home-feature.module').then(
        (m) => m.HomeFeatureModule,
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./blog/feature/blog-feature.module').then(
        (m) => m.BlogFeatureModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ScullyLibModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
