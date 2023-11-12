import { Component, Input } from '@angular/core';

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
  templateUrl: './form.component.html',
})
/**
 * For this project with only 1 form, this abstraction is more trouble than it's worth.
 * It is an experimental implementation that would potentially improve a site with many forms.
 */
export class FormComponent {
  @Input({ required: true }) model!: Form;

  protected readonly FieldType = FieldType;
}
