import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, TextAreaComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, TextAreaComponent, ButtonComponent],
})
export class ContactUiModule {}
