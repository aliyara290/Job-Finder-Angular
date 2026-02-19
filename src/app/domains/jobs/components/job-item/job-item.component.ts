import { Component, Input } from '@angular/core';
import {JobCard} from '../../types/job.types';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-job-item',
  imports: [
    DecimalPipe
  ],
  templateUrl: './job-item.component.html',
})
export class JobItemComponent {

  @Input() job!: JobCard;

}
