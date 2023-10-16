import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScullyLibModule, ScullyRoutesService } from '@scullyio/ng-lib';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MockScullyRoutesService } from '@colin/shared/util';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@colin/home/feature').then((m) => m.HomeFeatureModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('@colin/blog/feature').then((m) => m.BlogFeatureModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('@colin/contact/feature').then((m) => m.ContactFeatureModule),
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
  providers: [
    {
      provide: ScullyRoutesService,
      useClass: isDevMode() ? MockScullyRoutesService : ScullyRoutesService,
    },
  ],
})
export class AppModule {}
