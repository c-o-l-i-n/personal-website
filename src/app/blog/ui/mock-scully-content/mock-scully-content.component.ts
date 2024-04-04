import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'scully-content',
  templateUrl: './mock-scully-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockScullyContentComponent implements OnInit {
  private readonly el = inject(ElementRef);

  ngOnInit() {
    this.removeHostElement();
  }

  private removeHostElement(): void {
    const hostElement = this.el.nativeElement;
    const parentElement = hostElement.parentElement!;

    // move all children out of the element
    while (hostElement.firstChild) {
      parentElement.insertBefore(hostElement.firstChild, hostElement);
    }

    // remove the empty element(the host)
    parentElement.removeChild(hostElement);
  }
}
