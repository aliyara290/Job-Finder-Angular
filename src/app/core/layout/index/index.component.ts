import { Component } from '@angular/core';
import {MainHeaderComponent} from '../main-header/main-header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-index',
  imports: [
    MainHeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './index.component.html'
})
export class IndexComponent {

}
