import { Component, Input } from '@angular/core';

export interface PillModel {
  iconSrc: string;
  iconWidth?: number;
  text: string;
}

@Component({
  selector: 'colin-pill',
  templateUrl: './pill.component.html',
})
export class PillComponent {
  @Input({ required: true }) model!: PillModel;
}
