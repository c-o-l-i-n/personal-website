import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'colin-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() styleClass?: string;
  @Input() type = 'button';
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();
}
