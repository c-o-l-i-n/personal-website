import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@colin/shared/ui';
import { ContactUiModule } from '@colin/contact/ui';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent,
  },
];

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiModule,
    ContactUiModule,
  ],
})
export class ContactFeatureModule {}
