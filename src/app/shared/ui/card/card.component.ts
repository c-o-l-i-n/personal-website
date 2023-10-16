import { Component, Input } from '@angular/core';

@Component({
  selector: 'colin-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() header?: string;
  @Input() styleClass?: string;
  @Input() removeGap = false;
}
