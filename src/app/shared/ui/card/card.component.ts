import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'colin-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  header = input<string>();
  styleClass = input<string>();
  removeGap = input(false);
}
