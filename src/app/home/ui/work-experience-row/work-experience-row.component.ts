import { Component, Input } from '@angular/core';

export interface WorkExperienceRowModel {
  logoSrc: string;
  jobTitle: string;
  company: string;
  companyUrl: string;
  dateRange: string;
}

@Component({
  selector: 'colin-work-experience-row',
  templateUrl: './work-experience-row.component.html',
})
export class WorkExperienceRowComponent {
  @Input({ required: true }) model!: WorkExperienceRowModel;
}
