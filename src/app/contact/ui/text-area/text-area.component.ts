import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'colin-textarea',
  templateUrl: './text-area.component.html',
})
export class TextAreaComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) formControl!: FormControl;
  @Input() styleClass?: string;
}
