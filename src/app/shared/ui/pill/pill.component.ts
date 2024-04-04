import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PillModel {
  iconSrc: string;
  iconSize?: number;
  text: string;
}

@Component({
  selector: 'colin-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-shrink-0 items-center gap-1 rounded border bg-white px-2 py-1 text-sm',
  },
  template: `
    <img
      #img
      [src]="model().iconSrc"
      alt=""
      [width]="model().iconSize ?? 16"
      [height]="model().iconSize ?? 16"
      class="h-4"
    />
    {{ model().text }}
  `,
})
export class PillComponent {
  model = input.required<PillModel>();
}
