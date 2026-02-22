import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FilterService } from '../../../domains/jobs/service/filter.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../../domains/favorites/store/favorite.selectors';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  filterKeywordValue$: Observable<string>;
  filterLocationValue$: Observable<string>;
  favoritesCount$: Observable<number>;

  keyword = signal<string>('');
  location = signal<string>('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.filterKeywordValue$ = this.filterService.filterValue$;
    this.filterLocationValue$ = this.filterService.filterLocation$;
    this.keyword.set(this.filterService.keyword);
    this.location.set(this.filterService.location);
    this.favoritesCount$ = this.store.select(selectAllFavorites).pipe(
      map(favs => favs.length)
    );
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

  isSearchPage(): boolean {
    return this.router.isActive('/w/jobs/search', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
