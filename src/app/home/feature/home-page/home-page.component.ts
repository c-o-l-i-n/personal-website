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
      text: 'Angular Architect',
      iconSrc: '/assets/images/logos/angular.svg',
    },
    {
      text: 'TypeScript Titan',
      iconSrc: '/assets/images/logos/ts.svg',
      iconSize: 14,
    },
    {
      text: 'Firebase Fan',
      iconSrc: '/assets/images/logos/firebase.svg',
    },
    {
      text: 'Supabase Sorcerer',
      iconSrc: '/assets/images/logos/supabase.svg',
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
      logoSrc: '/assets/images/logos/eco.svg',
      dateRange: 'Mar 2022 - Present',
    },
    {
      jobTitle: 'Software Engineer',
      company: 'JPMorgan Chase & Co.',
      companyUrl: 'https://jpmorganchase.com',
      logoSrc: '/assets/images/logos/chase.svg',
      dateRange: 'Jul 2021 - Mar 2022',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'JPMorgan Chase & Co.',
      companyUrl: 'https://jpmorganchase.com',
      logoSrc: '/assets/images/logos/chase.svg',
      dateRange: 'Jun 2020 - Aug 2020',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'Hyland Software',
      companyUrl: 'https://hyland.com',
      logoSrc: '/assets/images/logos/hyland.svg',
      dateRange: 'May 2019 - Aug 2019',
    },
    {
      jobTitle: 'Software Engineer Intern',
      company: 'Diebold Nixdorf',
      companyUrl: 'https://dieboldnixdorf.com',
      logoSrc: '/assets/images/logos/dn.svg',
      dateRange: 'May 2018 - Aug 2018',
    },
  ];

  readonly sideProjectRows: SideProjectRowModel[] = [
    {
      name: 'EventMaster Pro (WIP)',
      url: 'https://github.com/c-o-l-i-n/joshies',
      logoSrc: '/assets/images/logos/emp.svg',
      notes:
        'Supercharge dynamic, multi-day competitions with realtime brackets, betting, and more',
    },
    {
      name: 'Potluk',
      url: 'https://potl.uk',
      logoSrc: '/assets/images/logos/potluk.svg',
      notes: 'Coordinate who brings what to your potluck',
    },
    {
      name: 'Presto Parts',
      url: 'https://prestoparts.org',
      logoSrc: '/assets/images/logos/pp.svg',
      notes: 'Organize sheet music PDFs in a few minutes, not many hours',
    },
    {
      name: 'Drill Generator',
      url: 'https://drillgenerator.com',
      logoSrc: '/assets/images/logos/drill-generator.svg',
      notes: 'Generate drills in the style of OSUMB tryouts',
    },
  ];

  readonly leadershipRows: WorkExperienceRowModel[] = [
    {
      jobTitle: 'Angular Development Mentor',
      company: 'Ecosystems.io',
      companyUrl: 'https://ecosystems.io',
      logoSrc: '/assets/images/logos/eco.svg',
      dateRange: 'Jun 2023 - Present',
    },
    {
      jobTitle: 'Programming Teacher & Tutor',
      company: 'Coding with Colin',
      companyUrl: 'https://codingwithcolin.com',
      logoSrc: '/assets/images/logos/grad.svg',
      dateRange: 'Jun 2020 - Nov 2021',
    },
    {
      jobTitle: 'Squad Leader',
      company: 'The OSU Marching Band',
      companyUrl: 'https://tbdbitl.osu.edu/',
      logoSrc: '/assets/images/logos/osu.svg',
      dateRange: 'Jun 2020 - Dec 2021',
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
    this.title.setTitle(
      'Colin Williams - Software Engineer & Frontend Architect',
    );
  }
}
