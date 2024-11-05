import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface SideProjectRowModel {
  logoSrc: string;
  name: string;
  url: string;
  notes: string;
}

@Component({
  selector: 'colin-side-project-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-center justify-end gap-1 md:flex-row',
  },
  template: `
    <div class="flex w-full flex-row items-center gap-3 md:w-auto md:gap-2">
      <a
        [href]="model().url"
        target="_blank"
        [attr.aria-label]="'Go to ' + model().name + ' website'"
        class="flex-shrink-0"
      >
        <img
          [src]="model().logoSrc"
          alt=""
          height="32"
          width="32"
          class="h-12 w-12 rounded-lg md:h-8 md:w-8 md:rounded-md"
        />
      </a>
      <p class="flex flex-col md:mt-0 md:flex-row md:gap-1.5">
        <a
          [href]="model().url"
          target="_blank"
          class="nobreak -mt-0.5 whitespace-nowrap font-medium hover:underline md:m-0"
          [attr.aria-label]="'Go to ' + model().name + ' website'"
        >
          {{ model().name }}
        </a>
        <span class="text-sm text-slate-400 md:hidden md:text-base">
          {{ model().notes }}
        </span>
      </p>
    </div>
    <p
      class="hidden flex-grow text-sm text-slate-500 md:block md:text-right md:text-base"
    >
      {{ model().notes }}
    </p>
  `,
})
export class SideProjectRowComponent {
  model = input.required<SideProjectRowModel>();
}
