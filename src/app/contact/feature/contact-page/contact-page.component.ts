import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'colin-contact-page',
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent {
  readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    message: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private readonly http: HttpClient) {}

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const formValue = this.form.getRawValue();
    const formData = new FormData();

    for (const control in this.form.controls) {
      formData.append(control, formValue[control as keyof typeof formValue]);
    }

    this.http.post('https://formspree.io/f/xwkwyeky', formData).subscribe({
      next: () => {
        this.form.reset();
        alert('✅ Message sent!');
      },
      error: () => alert('⛔️ There was an error submitting the form :('),
    });
  }
}
