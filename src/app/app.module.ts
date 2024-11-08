import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScullyLibModule, ScullyRoutesService } from '@scullyio/ng-lib';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MockScullyRoutesService } from '@colin/shared/util';
import { environment } from '@environment';
import { ShellUiModule } from '@colin/shell/ui';

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
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ScullyRoutesService,
      useClass: environment.production
        ? ScullyRoutesService
        : MockScullyRoutesService,
    },
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ScullyLibModule,
    ShellUiModule,
  ],
})
export class AppModule {}
