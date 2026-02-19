import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../service/jobs.service';
import {take} from 'rxjs';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent {
  jobDetails$;

  constructor(
    private jobService: JobsService
  ) {
    this.jobDetails$ = this.jobService.jobDetails$;
  }

}
