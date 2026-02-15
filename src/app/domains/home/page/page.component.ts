import { Component } from '@angular/core';
import {HeroComponent} from '../components/hero/hero.component';
import {FeaturesComponent} from '../components/features/features.component';

@Component({
  selector: 'app-page',
  imports: [
    HeroComponent,
    FeaturesComponent
  ],
  templateUrl: './page.component.html',
})
export class PageComponent {

}
