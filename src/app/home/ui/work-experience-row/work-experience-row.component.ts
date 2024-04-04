import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperienceRowComponent {
  model = input.required<WorkExperienceRowModel>();
}
