import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FieldType, Form } from '@colin/contact/ui';

@Component({
  selector: 'colin-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <colin-card class="mb-5">
      <h1
        class="text-center font-mono text-2xl font-medium md:text-left md:text-3xl"
      >
        Contact
      </h1>
    </colin-card>

    <colin-card class="bg-white">
      <colin-form [model]="form" />
    </colin-card>
  `,
})
export class ContactPageComponent implements OnInit {
  private readonly title = inject(Title);

  protected readonly form: Form = {
    submitUrl: 'https://formspree.io/f/xwkwyeky',
    fieldRows: [
      [
        {
          type: FieldType.Text,
          name: 'name',
          placeholder: 'Name',
          required: true,
        },
        {
          type: FieldType.Email,
          name: 'email',
          placeholder: 'Email',
          required: true,
        },
      ],
      [
        {
          type: FieldType.TextArea,
          name: 'message',
          placeholder: 'Message',
          required: true,
        },
      ],
      [
        {
          type: FieldType.Submit,
          text: 'Send',
        },
      ],
    ],
  };

  ngOnInit(): void {
    this.title.setTitle('Contact');
  }
}
