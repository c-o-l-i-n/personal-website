import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  booleanAttribute,
  input,
} from '@angular/core';

@Component({
  selector: 'colin-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (header()) {
      <h3 class="text-center text-sm text-slate-600 md:text-left">
        {{ header() }}
      </h3>
    }
    <ng-content />
  `,
})
export class CardComponent {
  @HostBinding('class') get hostClasses(): string {
    return `group flex h-full w-full flex-col rounded border border-slate-400 p-6 ${this.removeGap() ? '' : ' gap-4'}`;
  }

  header = input<string>();
  removeGap = input(false, { transform: booleanAttribute });
}
