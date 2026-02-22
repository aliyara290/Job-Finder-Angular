import { Component } from '@angular/core';
import {FavoriteListComponent} from '../../components/favorite-list/favorite-list.component';

@Component({
  selector: 'app-index',
  imports: [
    FavoriteListComponent
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {

}
