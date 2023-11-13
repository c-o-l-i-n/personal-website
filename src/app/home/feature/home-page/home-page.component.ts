import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, map } from 'rxjs';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { PillModel } from '@colin/shared/ui/pill/pill.component';
import { SideProjectRowModel, WorkExperienceRowModel } from '@colin/home/ui';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'colin-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  readonly skillPills: PillModel[] = [
    {
      text: 'TypeScript Wiz',
      iconSrc: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
      iconSize: 14,
    },
    {
      text: 'Angular Architect',
      iconSrc: 'https://icon.icepanel.io/Technology/svg/Angular.svg',
    },
    {
      text: 'Firebase Fan',
      iconSrc: 'https://icon.icepanel.io/Technology/svg/Firebase.svg',
    },
    {
      text: 'Java Junkie',
      iconSrc: 'https://icon.icepanel.io/Technology/svg/Java.svg',
    },
    {
      text: 'Spring Chicken',
      iconSrc: 'https://icon.icepanel.io/Technology/svg/Spring.svg',
      iconSize: 14,
    },
  ];

  readonly yearsOfExperience =
    Math.round(
      ((Date.now() - new Date('2020-09-01').getTime()) / 31557600000) * 2,
    ) / 2;

  readonly workExperienceRows: WorkExperienceRowModel[] = [
    {
      jobTitle: 'Software Engineer',
      company: 'Ecosystems.io',
      companyUrl: 'https://ecosystems.io',
      logoSrc: '/assets/images/logos/eco.webp',
      dateRange: 'Mar 2022 - Present',
    },
    {
      jobTitle: 'Software Engineer',
      company: 'JPMorgan Chase & Co.',
      companyUrl: 'https://jpmorganchase.com',
      logoSrc: '/assets/images/logos/chase.webp',
      dateRange: 'Jul 2021 - Mar 2022',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'JPMorgan Chase & Co.',
      companyUrl: 'https://jpmorganchase.com',
      logoSrc: '/assets/images/logos/chase.webp',
      dateRange: 'Jun 2020 - Aug 2020',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'Hyland Software',
      companyUrl: 'https://hyland.com',
      logoSrc: '/assets/images/logos/hyland.webp',
      dateRange: 'May 2019 - Aug 2019',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'Diebold Nixdorf',
      companyUrl: 'https://dieboldnixdorf.com',
      logoSrc: '/assets/images/logos/dn.webp',
      dateRange: 'May 2018 - Aug 2018',
    },
  ];

  readonly sideProjectRows: SideProjectRowModel[] = [
    {
      name: 'Potluk',
      url: 'https://potl.uk',
      logoSrc: '/assets/images/logos/potluk.webp',
      notes: 'Coordinate who brings what to your potluck',
    },
    {
      name: 'Presto Parts',
      url: 'https://prestoparts.org',
      logoSrc: '/assets/images/logos/pp.webp',
      notes: 'Organize sheet music PDFs in a few minutes, not many hours',
    },
    {
      name: 'Drill Generator',
      url: 'https://drillgenerator.com',
      logoSrc: '/assets/images/logos/drill-generator.webp',
      notes: 'Generate drills in the style of OSUMB tryouts',
    },
  ];

  private readonly blogPosts$: Observable<BlogPost[]> =
    this.scully.available$.pipe(
      map((routes) =>
        routes.filter((route) => route.route.startsWith('/blog/')),
      ),
      map((routes) => routes as BlogPost[]),
    );

  readonly featuredBlogPost$: Observable<BlogPost> = this.blogPosts$.pipe(
    map((posts) => posts.find((post) => post.featured)!),
  );

  readonly latestBlogPost$: Observable<BlogPost> = this.blogPosts$.pipe(
    map((posts) => posts.sort(sortBlogPostsByDate)[0]),
  );

  constructor(
    private scully: ScullyRoutesService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Colin Williams - Software Engineer & Designer');
  }
}
