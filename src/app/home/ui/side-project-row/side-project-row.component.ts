import { Component, input } from '@angular/core';

export interface SideProjectRowModel {
  logoSrc: string;
  name: string;
  url: string;
  notes: string;
}

@Component({
  selector: 'colin-side-project-row',
  templateUrl: './side-project-row.component.html',
})
export class SideProjectRowComponent {
  model = input.required<SideProjectRowModel>();
}
