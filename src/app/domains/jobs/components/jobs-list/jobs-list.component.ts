import {Component, OnInit, signal} from '@angular/core';
import { JobsService } from '../../service/jobs.service';
import { JobDetails, JobsData } from '../../types/job.types';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, map, switchMap, startWith } from 'rxjs';
import {JobsItemSkeletonComponent} from '../jobs-item-skeleton/jobs-item-skeleton.component';
import {JobItemComponent} from '../job-item/job-item.component';
import {AsyncPipe} from '@angular/common';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  imports: [
    JobsItemSkeletonComponent,
    JobItemComponent,
    AsyncPipe
  ]
})
export class JobsListComponent implements OnInit {

  vm$!: Observable<{
    loading: boolean;
    jobs: JobDetails[];
    searchResultCount: number;
    searchResultCountAll: number;
    numberOfPages: number;
  }>;

  currentPage = signal<number>(1);

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    const pageFromRoute = +(this.route.snapshot.queryParamMap.get('Page') || 1);
    this.currentPage.set(pageFromRoute);

    this.vm$ = this.route.queryParamMap.pipe(
      map(params => ({
        location: params.get('LocationName') || '',
        keyword: params.get('Keyword') || '',
        PositionSchedule: +(params.get('PositionSchedule') || ''),
        pageNumber: +(params.get('Page') || 1),
        postedDate: params.get('DatePosted') || ''
      })),
      switchMap(filters =>
        this.jobsService.getJobs(
          filters.location,
          filters.keyword,
          filters.PositionSchedule,
          filters.pageNumber,
          filters.postedDate
        ).pipe(
          map(jobsData => ({
            loading: false,
            jobs: jobsData.jobs,
            searchResultCount: jobsData.searchResultCount,
            searchResultCountAll: jobsData.searchResultCountAll,
            numberOfPages: jobsData.numberOfPages
          })),
          startWith({
            loading: true,
            jobs: [],
            searchResultCount: 0,
            searchResultCountAll: 0,
            numberOfPages: 0
          })
        )
      )
    );
  }

  setSelectedJob(job: JobDetails) {
    this.jobsService.onJobClick(job);
  }

  changePage(Page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {Page},
      queryParamsHandling: 'merge',
      replaceUrl: false
    })
  }

  nextPage() {
    this.currentPage.update(page => page + 1);
    this.changePage(this.currentPage());
  }

  previousPage() {
    this.currentPage.update(page => page - 1);
    this.changePage(this.currentPage());
  }
}

