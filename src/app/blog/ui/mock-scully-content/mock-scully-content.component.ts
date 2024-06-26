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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Section 1</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit unde ipsam
      <code>quidem</code> laudantium voluptatem quasi, aperiam quae odio magni
      provident quisquam fuga quibusdam minus nobis odit minima
      <code>magnam</code> nemo iusto!
    </p>
    <ul>
      <li>
        Platea <code>dictumst</code> quisque sagittis purus sit amet volutpat
        consequat mauris
      </li>
      <li>Leo integer malesuada nunc <code>vel</code></li>
      <li>
        Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci
      </li>
      <li>Bibendum est ultricies integer quis</li>
    </ul>
    <pre
      ngNonBindable
      class="language-sh"
    ><code class="language-sh">$ echo Hello World</code></pre>
    <p>
      Ultrices tincidunt arcu non sodales. Egestas integer eget aliquet nibh
      praesent. Faucibus turpis in eu mi bibendum neque egestas. Egestas tellus
      rutrum tellus pellentesque eu. Nunc sed id semper risus in hendrerit
      gravida rutrum quisque. Fermentum leo vel orci porta.
    </p>
    <pre
      ngNonBindable
      class="language-typescript"
    ><code class="language-typescript"><span class="token decorator"><span class="token at operator">&commat;</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&lcub;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;h1&gt;Welcome!&lt;/h1&gt;
    &lt;p&gt;Here are your messages: &lcub;&lcub; messages$ | async &rcub;&rcub;&lt;/p&gt;
  </span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
<span class="token punctuation">&rcub;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">&lcub;</span>
  <span class="token keyword">readonly</span> messages$<span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token string">'Hello'</span><span class="token punctuation">,</span> <span class="token string">'World'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&rcub;</span></code></pre>
    <p>
      Nisi blanditiis facere, inventore veritatis officiis iste eius quia
      similique beatae? Nemo, temporibus, <code>mollitia</code> enim error
      labore quaerat totam sapiente quidem, laudantium eveniet est incidunt
      necessitatibus adipisci. Omnis, <code>adipisci</code> explicabo.
    </p>

    <h2>Section 2</h2>
    <p>
      Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.
      Tincidunt dui ut ornare lectus sit amet.
    </p>
    <img src="/assets/images/placeholder.webp" alt="Placeholder" />
    <p>
      Nisi saepe atque voluptate, eaque nobis sint alias adipisci, quidem
      inventore debitis aut! Vitae repellendus excepturi quis, quod nostrum in
      quas hic, et ipsum <code>ducimus</code>, quisquam veritatis id deleniti
      consectetur.
    </p>
    <pre
      ngNonBindable
      class="language-typescript"
    ><code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&lcub;</span> AppComponent <span class="token punctuation">&rcub;</span> <span class="token keyword">from</span> <span class="token string">'./app.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&lcub;</span> SubscriberSpy<span class="token punctuation">,</span> subscribeSpyTo <span class="token punctuation">&rcub;</span> <span class="token keyword">from</span> <span class="token string">'&commat;hirez_io/observer-spy'</span><span class="token punctuation">;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'AppComponent'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">&lcub;</span>
  <span class="token keyword">let</span> component<span class="token operator">:</span> AppComponent<span class="token punctuation">;</span>

  <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">&lcub;</span>
    component <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AppComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&rcub;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'messages$'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">&lcub;</span>
    <span class="token comment">// Declare an observer spy</span>
    <span class="token keyword">let</span> messagesObserverSpy<span class="token operator">:</span> SubscriberSpy<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

    <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">&lcub;</span>
      <span class="token comment">// Subscribe to the Observable</span>
      messagesObserverSpy <span class="token operator">=</span> <span class="token function">subscribeSpyTo</span><span class="token punctuation">(</span>component<span class="token punctuation">.</span>messages$<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&rcub;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'should return a stream of messages'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">&lcub;</span>
      <span class="token comment">// Assert the values are what we expect</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>messagesObserverSpy<span class="token punctuation">.</span><span class="token function">getValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Hello'</span><span class="token punctuation">,</span> <span class="token string">'World'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&rcub;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&rcub;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&rcub;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
    <p>
      Quis dolore, <code>ratione</code> assumenda atque, praesentium accusantium
      laboriosam alias numquam corporis neque molestiae enim, sint eligendi ea
      nobis recusandae nam totam omnis sed. Commodi aliquam
      <code>enim</code> expedita accusantium, labore quo!
    </p>

    <iframe
      width="100%"
      src="https://www.youtube-nocookie.com/embed/tlWlFpEmTeE"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen=""
    ></iframe>

    <h2>Conclusion</h2>
    <p>
      Vero adipisci ratione architecto veritatis perspiciatis, beatae aut
      <code>facere</code>&nbsp;<code>odio</code> fuga quis alias quae corrupti
      ullam, modi dolore iste accusantium laudantium amet iure natus earum
      doloremque? Nostrum sequi consequuntur recusandae.
    </p>
    <ol>
      <li>Ac turpis egestas integer eget aliquet</li>
      <li>Pulvinar pellentesque habitant morbi tristique senectus et netus</li>
      <li>
        Tempor orci dapibus ultrices in iaculis nunc. Orci dapibus ultrices in
        iaculis nunc sed augue lacus viverra
      </li>
    </ol>
  `,
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
