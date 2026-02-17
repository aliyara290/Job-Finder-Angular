import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JobCard, JobDetails, JobsApiResponse, JobsData} from '../types/job.types';
import {environments} from '../../../../environments/environement.dev';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobsService {

  private readonly API_URL = environments.REMOTE_BACKEND_API;

  private jobDetailsSubject = new BehaviorSubject<JobDetails | null>(null);
  jobDetails$ = this.jobDetailsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getJobs(location?: string, keyword?: string, PositionSchedule?: number, PageNumber?: number, PostedDate?: number | string): Observable<JobsData> {
    const params: any = {};
    if (keyword) params.Keyword = keyword;
    if (location) params.LocationName = location;
    if (PositionSchedule) params.PositionSchedule = PositionSchedule;
    if (PageNumber) params.Page = PageNumber;
    if (PostedDate) params.DatePosted = PostedDate;

    // const queryString = new URLSearchParams(params).toString();
    // const fullUrl = `${this.API_URL}/Search?${queryString}`;
    // console.log('Request URL:', fullUrl);

    return this.http.get<JobsApiResponse>(`${this.API_URL}/Search`, { params }).pipe(
      map(response => this.mapApiResponseToJobDetails(response))
    );
  }


  private mapApiResponseToJobDetails(response: JobsApiResponse): JobsData {
    const jobs = response.SearchResult.SearchResultItems.map(item => {
      const descriptor = item.MatchedObjectDescriptor;
      const details = descriptor.UserArea.Details;

      return {
        id: item.MatchedObjectId,
        title: descriptor.PositionTitle,
        company: descriptor.OrganizationName,
        location: descriptor.PositionLocationDisplay,
        department: descriptor.DepartmentName,
        applyUrl: descriptor.ApplyURI[0] || descriptor.PositionURI,
        jobSummary: details.JobSummary || '',
        qualificationSummary: details.QualificationSummary || descriptor.QualificationSummary,
        education: details.Education,
        totalOpenings: details.TotalOpenings,
        securityClearance: details.SecurityClearance,
        responsibilities: details.MajorDuties,
        salaryMin: descriptor.PositionRemuneration[0]?.MinimumRange ? parseInt(descriptor.PositionRemuneration[0].MinimumRange) : undefined,
        salaryMax: descriptor.PositionRemuneration[0]?.MaximumRange ? parseInt(descriptor.PositionRemuneration[0].MaximumRange) : undefined,
        salaryInterval: descriptor.PositionRemuneration[0]?.Description,
        openDate: descriptor.PublicationStartDate,
        closeDate: descriptor.ApplicationCloseDate,
      };
    });

    return {
      jobs,
      searchResultCount: response.SearchResult.SearchResultCount,
      searchResultCountAll: response.SearchResult.SearchResultCountAll,
      numberOfPages: response.SearchResult.UserArea.NumberOfPages
    };
  }

  onJobClick(job: JobDetails) {
    this.jobDetailsSubject.next(job);
  }

}
