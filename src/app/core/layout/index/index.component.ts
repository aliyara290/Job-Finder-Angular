import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { loadFavorites } from '../../../domains/favorites/store/favorite.actions';
import { loadApplications } from '../../../domains/applications-tracker/store/application.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  constructor(
    private store: Store,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser()?.id ?? '';
    if (userId) {
      this.store.dispatch(loadFavorites({ userId }));
      this.store.dispatch(loadApplications({ userId }));
    }
  }
}
