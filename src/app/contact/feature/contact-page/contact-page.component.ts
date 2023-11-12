import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FieldType, Form } from '@colin/contact/ui';

@Component({
  selector: 'colin-contact-page',
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent implements OnInit {
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

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Contact');
  }
}
