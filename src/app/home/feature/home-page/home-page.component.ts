import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs';
import { BlogPost, sortBlogPostsByDate } from '@colin/shared/util';
import { PillModel } from '@colin/shared/ui/pill/pill.component';
import { SideProjectRowModel, WorkExperienceRowModel } from '@colin/home/ui';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'colin-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-5',
  },
  template: `
    <colin-card header="About Me">
      <h3
        class="flex flex-col justify-center text-center font-mono text-xl font-medium sm:flex-row md:justify-start md:text-left md:text-2xl"
      >
        <span class="sm:mr-3 md:mr-4">
          <span class="text-slate-400">&lcub;&lcub;</span>Software Engineer<span
            class="text-slate-400"
            >&rcub;&rcub;</span
          >
        </span>
        <span class="whitespace-nowrap">&amp; Frontend Architect</span>
      </h3>

      <!-- Skill Pills -->
      <div class="flex flex-wrap gap-1">
        @for (pill of skillPills; track pill.text) {
          <a href="#experience">
            <colin-pill [model]="pill" />
          </a>
        }
      </div>

      <p>
        As a software engineer, I'm passionate about crafting exceptional user
        experiences. Architecting robust Angular applications is where I truly
        shine.
      </p>

      <p>As a person, I'm passionate about music, cats, skiing, and cashews.</p>
    </colin-card>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <!-- Featured Article -->
      <colin-blog-post-card
        [post]="featuredArticle()"
        header="Featured Article"
      />

      <!-- Latest Article -->
      <colin-blog-post-card [post]="latestArticle()" header="Latest Article" />
    </div>

    <!-- Experience -->
    <colin-card id="experience" class="bg-white">
      <h2
        class="mb-4 text-center font-mono text-xl font-medium md:text-left md:text-2xl"
      >
        Experience ({{ yearsOfExperience | number: '1.0-1' }} yrs)
      </h2>

      <div>
        @for (
          row of workExperienceRows;
          track row.jobTitle;
          let first = $first;
          let last = $last
        ) {
          <div
            class="border-slate-200 py-4 md:border-b"
            [class.border-none]="last"
            [class.pt-0]="first"
          >
            <colin-work-experience-row [model]="row" />
          </div>
        }
      </div>
    </colin-card>

    <!-- Leadership & Mentoring -->
    <colin-card id="leadership" class="bg-white">
      <h2
        class="mb-4 text-center font-mono text-xl font-medium md:text-left md:text-2xl"
      >
        Leadership & Mentoring
      </h2>

      <div>
        @for (
          row of leadershipRows;
          track row.jobTitle;
          let first = $first;
          let last = $last
        ) {
          <div
            class="border-slate-200 py-4 md:border-b"
            [class.border-none]="last"
            [class.pt-0]="first"
          >
            <colin-work-experience-row [model]="row" />
          </div>
        }
      </div>
    </colin-card>

    <!-- Side Projects -->
    <colin-card id="projects" class="bg-white">
      <h2
        class="mb-4 text-center font-mono text-xl font-medium md:text-left md:text-2xl"
      >
        Side Projects
      </h2>

      <div>
        @for (
          row of sideProjectRows;
          track row.name;
          let first = $first;
          let last = $last
        ) {
          <div
            class="border-slate-200 py-4 md:border-b"
            style="text-wrap: balance"
            [class.border-none]="last"
            [class.pt-0]="first"
          >
            <colin-side-project-row [model]="row" />
          </div>
        }
      </div>
    </colin-card>
  `,
})
export class HomePageComponent implements OnInit {
  private readonly scully = inject(ScullyRoutesService);
  private readonly title = inject(Title);

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
      text: 'AI Artisan',
      iconSrc: '/assets/images/logos/openai.svg',
    },
    {
      text: 'Firebase Fan',
      iconSrc: '/assets/images/logos/firebase.svg',
    },
    {
      text: 'Supabase Sage',
      iconSrc: '/assets/images/logos/supabase.svg',
      iconSize: 14,
    },
  ];

  readonly yearsOfExperience =
    Math.round(
      ((Date.now() - new Date('2020-08-01').getTime()) / 31557600000) * 2,
    ) / 2;

  readonly workExperienceRows: WorkExperienceRowModel[] = [
    {
      jobTitle: 'Senior Frontend Engineer & Architect',
      company: 'Ecosystems.io',
      companyUrl: 'https://ecosystems.io',
      logoSrc: '/assets/images/logos/eco.svg',
      dateRange: 'Feb 2024 - Present',
    },
    {
      jobTitle: 'Software Engineer II',
      company: 'Ecosystems.io',
      companyUrl: 'https://ecosystems.io',
      logoSrc: '/assets/images/logos/eco.svg',
      dateRange: 'Mar 2022 - Feb 2024',
    },
    {
      jobTitle: 'Software Engineer I',
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
      url: 'https://github.com/c-o-l-i-n/joshies#readme',
      logoSrc: '/assets/images/logos/emp.svg',
      notes:
        'Supercharge dynamic, multi-day competitions with realtime brackets, betting, analytics, and more',
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
      jobTitle: 'Conference Speaker',
      company: 'ng-conf "Lightning Talks"',
      companyUrl: 'https://youtu.be/tlWlFpEmTeE',
      logoSrc: '/assets/images/logos/ng-conf.webp',
      dateRange: 'Mar 2024',
    },
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

  private readonly blogPosts = toSignal(
    this.scully.available$.pipe(
      map((routes) => routes as BlogPost[]),
      map((routes) =>
        routes
          .filter((route) => route.route.startsWith('/blog/'))
          .sort(sortBlogPostsByDate),
      ),
    ),
    { requireSync: true },
  );

  readonly featuredArticle = computed(
    () => this.blogPosts().find((post) => post.featured)!,
  );

  readonly latestArticle = computed(() => this.blogPosts()[0]);

  ngOnInit(): void {
    this.title.setTitle(
      'Colin Williams - Software Engineer & Frontend Architect',
    );
  }
}
