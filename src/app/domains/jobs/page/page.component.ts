import { Component } from '@angular/core';
import {FilterComponent} from '../components/filter/filter.component';
import {JobDetailsComponent} from '../components/job-details/job-details.component';
import {JobsListComponent} from '../components/jobs-list/jobs-list.component';

@Component({
  selector: 'app-page',
  imports: [
    FilterComponent,
    JobDetailsComponent,
    JobsListComponent,
  ],
  templateUrl: './page.component.html',
})
export class PageComponent {

}
