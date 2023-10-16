import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'scully-content',
  templateUrl: './mock-scully-content.component.html',
})
export class MockScullyContentComponent implements OnInit {
  elm = this.elmRef.nativeElement as HTMLElement;

  constructor(private elmRef: ElementRef) {}

  ngOnInit(): void {
    this.removeHost();
  }

  private removeHost() {
    const nativeElement: HTMLElement = this.elmRef.nativeElement,
      parentElement: HTMLElement | null = nativeElement.parentElement;

    if (!parentElement) {
      throw new Error('No parent element found');
    }

    const cssId = this.getCSSId(nativeElement);

    // move all children out of the element
    while (nativeElement.firstChild) {
      const nodeToInsert = nativeElement.firstChild;
      // @ts-expect-error: we know this node is an HTMLElement
      nodeToInsert.setAttribute(cssId, true);

      parentElement.insertBefore(nodeToInsert, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }

  getCSSId(elm: HTMLElement) {
    return (
      elm.getAttributeNames().find((a) => a.startsWith('_ngcontent')) ?? ''
    );
  }
}
