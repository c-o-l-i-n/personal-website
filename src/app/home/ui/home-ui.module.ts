import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceRowComponent } from './work-experience-row.component';
import { RouterLink } from '@angular/router';
import { SideProjectRowComponent } from './side-project-row.component';

@NgModule({
  declarations: [WorkExperienceRowComponent, SideProjectRowComponent],
  imports: [CommonModule, RouterLink],
  exports: [WorkExperienceRowComponent, SideProjectRowComponent],
})
export class HomeUiModule {}
