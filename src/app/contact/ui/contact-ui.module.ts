import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@colin/contact/ui/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormComponent],
})
export class ContactUiModule {}
