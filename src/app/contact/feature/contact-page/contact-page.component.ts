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
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
