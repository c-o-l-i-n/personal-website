import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PillModel {
  iconSrc: string;
  iconSize?: number;
  text: string;
}

@Component({
  selector: 'colin-pill',
  templateUrl: './pill.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
  model = input.required<PillModel>();
}
