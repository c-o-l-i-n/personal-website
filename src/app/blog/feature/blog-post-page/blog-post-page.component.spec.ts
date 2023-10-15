import { BlogPostPageComponent } from './blog-post-page.component';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { of } from 'rxjs';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let scully: jest.Mocked<ScullyRoutesService>;
  let currentBlogPostRoute: ScullyRoute;

  beforeEach(() => {
    currentBlogPostRoute = {
      route: '/blog/current-post',
    };

    // @ts-expect-error: this test does not require all members
    scully = {
      getCurrent: jest.fn().mockReturnValue(of(currentBlogPostRoute)),
    };

    component = new BlogPostPageComponent(scully);
  });

  describe('post$', () => {
    let postObserverSpy: SubscriberSpy<ScullyRoute>;

    beforeEach(() => {
      postObserverSpy = subscribeSpyTo(component.post$);
    });

    it('should emit the current page blog post', () => {
      expect(postObserverSpy.getValues()).toEqual([currentBlogPostRoute]);
    });
  });
});
