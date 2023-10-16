import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedUiModule } from '@colin/shared/ui';
import { HomeUiModule } from '../ui';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiModule,
    HomeUiModule,
  ],
})
export class HomeFeatureModule {}
