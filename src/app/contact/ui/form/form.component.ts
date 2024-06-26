import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export enum FieldType {
  Text = 'text',
  Email = 'email',
  TextArea = 'textarea',
  Submit = 'submit',
}

export type Field = {
  id?: string;
  styleClass?: string;
} & (
  | {
      type: FieldType.Text | FieldType.Email | FieldType.TextArea;
      name: string;
      placeholder: string;
      required?: true;
    }
  | {
      type: FieldType.Submit;
      text: string;
    }
);

export interface Form {
  submitUrl: string;
  fieldRows: Field[][];
}

@Component({
  selector: 'colin-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [action]="model().submitUrl"
      method="post"
      class="flex flex-col gap-4"
      ngNativeValidate
    >
      @for (row of model().fieldRows; track row) {
        <div
          [ngClass]="
            row.length > 1 ? 'md:grid-cols-' + row.length + ' grid gap-4 ' : ''
          "
        >
          @for (field of row; track field) {
            @switch (field.type) {
              @case (FieldType.Text) {
                <input
                  type="text"
                  [attr.id]="field.id"
                  [attr.name]="field.name"
                  [attr.placeholder]="field.placeholder"
                  [attr.required]="field.required"
                  class="block w-full rounded bg-slate-100 px-5 py-3 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  [ngClass]="field.styleClass"
                />
              }
              @case (FieldType.Email) {
                <input
                  type="email"
                  [attr.id]="field.id"
                  [attr.name]="field.name"
                  [attr.placeholder]="field.placeholder"
                  [attr.required]="field.required"
                  class="block w-full rounded bg-slate-100 px-5 py-3 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  [ngClass]="field.styleClass"
                />
              }
              @case (FieldType.TextArea) {
                <textarea
                  [attr.id]="field.id"
                  [attr.name]="field.name"
                  [attr.placeholder]="field.placeholder"
                  [attr.required]="field.required"
                  class="block max-h-96 min-h-[12rem] w-full rounded bg-slate-100 px-5 py-3 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  [ngClass]="field.styleClass"
                ></textarea>
              }
              @case (FieldType.Submit) {
                <input
                  type="submit"
                  [attr.value]="field.text"
                  class="w-full cursor-pointer rounded bg-slate-800 px-6 py-3 font-mono font-medium text-white"
                  [ngClass]="field.styleClass"
                />
              }
            }
          }
        </div>
      }
    </form>
  `,
})
/**
 * For this project with only 1 form, this abstraction is more trouble than it's worth.
 * It is an experimental implementation that would potentially improve a site with many forms.
 */
export class FormComponent {
  model = input.required<Form>();

  protected readonly FieldType = FieldType;
}
