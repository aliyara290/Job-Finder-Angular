import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-main-header',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/auth/login']);
  }

}
