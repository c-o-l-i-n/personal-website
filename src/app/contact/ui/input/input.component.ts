import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'colin-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) formControl!: FormControl;
  @Input() type = 'text';
  @Input() styleClass?: string;
}
