import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockScullyContentComponent } from './mock-scully-content.component';

@NgModule({
  declarations: [MockScullyContentComponent],
  imports: [CommonModule],
  exports: [MockScullyContentComponent],
})
export class BlogUiModule {}
