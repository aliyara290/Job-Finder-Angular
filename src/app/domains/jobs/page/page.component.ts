import { Component } from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {FilterComponent} from '../components/filter/filter.component';
import {JobItemComponent} from '../components/job-item/job-item.component';
import {JobDetailsComponent} from '../components/job-details/job-details.component';
import {FooterComponent} from '../../../core/layout/footer/footer.component';
import {JobsListComponent} from '../components/jobs-list/jobs-list.component';
import {JobsItemSkeletonComponent} from '../components/jobs-item-skeleton/jobs-item-skeleton.component';

@Component({
  selector: 'app-page',
  imports: [
    HeaderComponent,
    FilterComponent,
    JobItemComponent,
    JobDetailsComponent,
    FooterComponent,
    JobsListComponent,
    JobsItemSkeletonComponent
  ],
  templateUrl: './page.component.html',
})
export class PageComponent {

}
