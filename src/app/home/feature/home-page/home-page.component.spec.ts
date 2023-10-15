import { HomePageComponent } from './home-page.component';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { of } from 'rxjs';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let scully: jest.Mocked<ScullyRoutesService>;
  let blogPostRoutes: ScullyRoute[];
  let availableRoutes: ScullyRoute[];

  beforeEach(() => {
    blogPostRoutes = [
      {
        route: '/blog/post-1',
      },
      {
        route: '/blog/post-2',
      },
    ];

    availableRoutes = [
      {
        route: '/',
      },
      ...blogPostRoutes,
    ];

    // @ts-expect-error: this test does not require all members
    scully = {
      available$: of(availableRoutes),
    };

    component = new HomePageComponent(scully);
  });

  describe('blogPosts$', () => {
    let blogPostsObserverSpy: SubscriberSpy<ScullyRoute[]>;

    beforeEach(() => {
      blogPostsObserverSpy = subscribeSpyTo(component.blogPosts$);
    });

    it('should emit the current page blog post', () => {
      expect(blogPostsObserverSpy.getValues()).toEqual([blogPostRoutes]);
    });
  });
});
