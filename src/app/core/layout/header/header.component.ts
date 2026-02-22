import {Component, signal} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAuthenticated$;
  filterKeywordValue;
  filterLocationValue;

  keyword = signal<string>('');
  location = signal<string>('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private filterService: FilterService,
    private route: ActivatedRoute
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.filterKeywordValue = this.filterService.filterValue$;
    this.filterLocationValue = this.filterService.filterLocation$;
    this.keyword.set(this.filterService.keyword);
    this.location.set(this.filterService.location);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onKeywordChange(event: Event) {
    this.filterService.setFilterKeywordValue((event.target as HTMLInputElement).value)
  }

  onLocationChange(event: Event) {
    this.filterService.setFilterLocationValue((event.target as HTMLInputElement).value);
  }

  search() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        Keyword: this.filterService.keyword,
        LocationName: this.filterService.location
      },
      queryParamsHandling: 'merge',
      replaceUrl: false
    })
  }
}
