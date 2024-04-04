import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'colin-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="group flex h-full w-full flex-col rounded border border-slate-400 p-6"
      [ngClass]="(styleClass() ?? '') + (removeGap() ? '' : ' gap-4')"
    >
      @if (header()) {
        <h3 class="text-center text-sm text-slate-600 md:text-left">
          {{ header() }}
        </h3>
      }
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  header = input<string>();
  styleClass = input<string>();
  removeGap = input(false);
}
