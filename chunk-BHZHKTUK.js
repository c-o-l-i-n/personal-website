import{a as P,c as k}from"./chunk-CBBEHXEZ.js";import{a as R,c as T,d as $}from"./chunk-E4XRQ6ES.js";import{$ as B,E as q,I as m,J as p,L as _,M as u,O as f,P as o,Q as a,R as d,X as s,Y as E,Z as N,ba as g,ca as C,da as D,g as v,ha as I,ia as h,ka as b,la as F,ma as w,v as S,x as c,xa as x,y as O}from"./chunk-MVQLXB3M.js";import"./chunk-2XJVAMHT.js";var A=(()=>{let t=class t{constructor(i){this.elmRef=i,this.elm=this.elmRef.nativeElement}ngOnInit(){this.removeHost()}removeHost(){let i=this.elmRef.nativeElement,e=i.parentElement;if(!e)throw new Error("No parent element found");let r=this.getCSSId(i);for(;i.firstChild;){let M=i.firstChild;M.setAttribute(r,!0),e.insertBefore(M,i)}e.removeChild(i)}getCSSId(i){return i.getAttributeNames().find(e=>e.startsWith("_ngcontent"))??""}};t.\u0275fac=function(e){return new(e||t)(p(q))},t.\u0275cmp=c({type:t,selectors:[["scully-content"]],decls:16,vars:0,template:function(e,r){e&1&&(o(0,"h2"),s(1,"Section 1"),a(),o(2,"p"),s(3,` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit unde ipsam quidem laudantium voluptatem quasi, aperiam quae odio magni provident quisquam fuga quibusdam minus nobis odit minima magnam nemo iusto!
`),a(),o(4,"p"),s(5,` Nisi blanditiis facere, inventore veritatis officiis iste eius quia similique beatae? Nemo, temporibus, mollitia enim error labore quaerat totam sapiente quidem, laudantium eveniet est incidunt necessitatibus adipisci. Omnis, adipisci explicabo.
`),a(),o(6,"h2"),s(7,"Section 2"),a(),o(8,"p"),s(9,` Nisi saepe atque voluptate, eaque nobis sint alias adipisci, quidem inventore debitis aut! Vitae repellendus excepturi quis, quod nostrum in quas hic, et ipsum ducimus, quisquam veritatis id deleniti consectetur.
`),a(),o(10,"p"),s(11,` Quis dolore, ratione assumenda atque, praesentium accusantium laboriosam alias numquam corporis neque molestiae enim, sint eligendi ea nobis recusandae nam totam omnis sed. Commodi aliquam enim expedita accusantium, labore quo!
`),a(),o(12,"h2"),s(13,"Conclusion"),a(),o(14,"p"),s(15,` Vero adipisci ratione architecto veritatis perspiciatis, beatae aut facere odio fuga quis alias quae corrupti ullam, modi dolore iste accusantium laudantium amet iure natus earum doloremque? Nostrum sequi consequuntur recusandae.
`),a())},encapsulation:2});let n=t;return n})();function J(n,t){if(n&1&&(o(0,"article"),d(1,"div",1),o(2,"h1",2),s(3),a(),o(4,"div",3)(5,"dl")(6,"dt",4),s(7,"Date"),a(),o(8,"dd",5)(9,"time"),s(10),g(11,"date"),a()()()(),o(12,"div",6),d(13,"scully-content"),a()()),n&2){let l=t.$implicit;m(1),u("ngClass","bg-[url("+l.thumbnail+")]"),m(2),N(" ",l.title," "),m(6),_("datetime",l.publishedDate),m(1),E(D(11,4,l.publishedDate,"fullDate","UTC"))}}var L=n=>[n],z=(()=>{let t=class t{constructor(i){this.scully=i,this.post$=this.scully.getCurrent()}};t.\u0275fac=function(e){return new(e||t)(p(P))},t.\u0275cmp=c({type:t,selectors:[["colin-blog-post-page"]],decls:2,vars:5,consts:[[4,"ngFor","ngForOf"],[1,"my-10","aspect-video","w-full","rounded","bg-cover","bg-center",3,"ngClass"],[1,"font-mono","text-2xl","font-extrabold","tracking-tight","text-slate-900","md:text-3xl"],[1,"text-sm","leading-6"],[1,"sr-only"],[1,"text-slate-700"],[1,"content","mb-32","mt-8"]],template:function(e,r){e&1&&(f(0,J,14,8,"article",0),g(1,"async")),e&2&&u("ngForOf",B(3,L,C(1,1,r.post$)))},dependencies:[I,h,A,b,F],styles:[".content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin-bottom:1rem;margin-top:2rem;font-family:JetBrains Mono,ui-monospace;font-weight:800}.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:1rem}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:1.25rem}"]});let n=t;return n})();function Q(n,t){if(n&1&&d(0,"colin-blog-post-card",4),n&2){let l=t.$implicit;u("post",l)}}var H=(()=>{let t=class t{constructor(i){this.scully=i,this.posts$=this.scully.available$.pipe(v(e=>e),v(e=>e.filter(r=>r.route.startsWith("/blog/")).sort(k)))}};t.\u0275fac=function(e){return new(e||t)(p(P))},t.\u0275cmp=c({type:t,selectors:[["colin-blog-page"]],decls:6,vars:3,consts:[["styleClass","mb-5"],[1,"text-center","font-mono","text-2xl","md:text-left","md:text-3xl"],[1,"grid","grid-cols-1","gap-5","md:grid-cols-2"],[3,"post",4,"ngFor","ngForOf"],[3,"post"]],template:function(e,r){e&1&&(o(0,"colin-card",0)(1,"h1",1),s(2,"Blog"),a()(),o(3,"div",2),f(4,Q,1,1,"colin-blog-post-card",3),g(5,"async"),a()),e&2&&(m(4),u("ngForOf",C(5,1,r.posts$)))},dependencies:[h,T,R,b],encapsulation:2});let n=t;return n})();var G=[{path:"",component:H},{path:":title",component:z}],lt=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=O({type:t}),t.\u0275inj=S({imports:[w,x.forChild(G),x,$]});let n=t;return n})();export{lt as BlogFeatureModule,H as BlogPageComponent,z as BlogPostPageComponent};
