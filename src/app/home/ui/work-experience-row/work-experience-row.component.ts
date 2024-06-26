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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-center justify-between gap-1 md:flex-row',
  },
  template: `
    <div class="flex w-full flex-row items-center gap-3 md:w-auto md:gap-2">
      <a
        [href]="model().companyUrl"
        target="_blank"
        [attr.aria-label]="'Go to ' + model().company + ' website'"
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
        <span class="font-medium">{{ model().jobTitle }}</span>
        <span>
          &commat;
          <a
            [href]="model().companyUrl"
            target="_blank"
            class="nobreak -mt-0.5 whitespace-nowrap hover:underline md:m-0"
            [attr.aria-label]="'Go to ' + model().company + ' website'"
          >
            {{ model().company }}
          </a>
        </span>
        <span class="mt-1 inline text-sm text-slate-400 md:hidden md:text-base">
          {{ model().dateRange }}
        </span>
      </p>
    </div>
    <p class="hidden flex-shrink text-sm text-slate-500 md:inline md:text-base">
      {{ model().dateRange }}
    </p>
  `,
})
export class WorkExperienceRowComponent {
  model = input.required<WorkExperienceRowModel>();
}
