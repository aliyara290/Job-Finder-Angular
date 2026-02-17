import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
})
export class FilterComponent {

  constructor(
    private router : Router,
    private route : ActivatedRoute,
  ) {
  }

  onSortChange(event: Event) {
    const PositionSchedule = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {PositionSchedule},
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }

  onDateChange(event: Event) {
    const DatePosted = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {DatePosted},
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }
}
