---
title: 'Mock Blog Post 1'
description: 'This is a fake block post'
thumbnail: /assets/images/placeholder.webp
published: false
publishedDate: 2023-10-13T00:00:00.000Z
tags:
  - Angular
slugs:
  - ___UNPUBLISHED___lparr85c_vsUU718LPDeYfZmgXkGBhmHUTaw5tIpo
---

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Faucibus a pellentesque sit amet porttitor eget. Sed adipiscing diam donec adipiscing tristique risus nec. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam.

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome!</h1>
    <p>Here are your messages: {{ messages$ | async }}</p>
  `,
})
export class AppComponent {
  readonly messages$: Observable<string> = of('Hello', 'World');
}
```

Eu facilisis sed odio morbi quis commodo. Purus semper eget duis at tellus at urna condimentum. Volutpat sed cras ornare arcu dui vivamus arcu. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Netus et malesuada fames ac turpis egestas integer. Ut pharetra sit amet aliquam id diam maecenas. Et netus et malesuada fames ac turpis egestas. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.

## Section 2

Fringilla ut morbi tincidunt augue interdum. Morbi tristique senectus et netus. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tincidunt ornare massa eget egestas purus viverra accumsan. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Placerat vestibulum lectus mauris ultrices eros in. Adipiscing tristique risus nec feugiat in fermentum posuere urna.

```typescript
import { AppComponent } from './app.component';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  describe('messages$', () => {
    // Declare an observer spy
    let messagesObserverSpy: SubscriberSpy<string>;

    beforeEach(() => {
      // Subscribe to the Observable
      messagesObserverSpy = subscribeSpyTo(component.messages$);
    });

    it('should return a stream of messages', () => {
      // Assert the values are what we expect
      expect(messagesObserverSpy.getValues()).toEqual(['Hello', 'World']);
    });
  });
});
```

Leo in vitae turpis massa sed elementum tempus. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Urna et pharetra pharetra massa massa ultricies. In iaculis nunc sed augue lacus viverra vitae. Libero enim sed faucibus turpis. Tristique senectus et netus et malesuada fames ac. Eu turpis egestas pretium aenean pharetra. Nunc sed augue lacus viverra vitae congue eu consequat.

## Conclusion

Pellentesque dignissim enim sit amet venenatis urna cursus eget. Arcu non sodales neque sodales ut. Sed libero enim sed faucibus. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Egestas dui id ornare arcu odio ut. Amet nisl purus in mollis nunc sed id semper.
