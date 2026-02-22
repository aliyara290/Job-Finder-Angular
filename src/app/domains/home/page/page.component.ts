import { Component } from '@angular/core';
import {HeroComponent} from '../components/hero/hero.component';
import {FeaturesComponent} from '../components/features/features.component';
import {MainHeaderComponent} from '../components/main-header/main-header.component';
import {FooterComponent} from '../../../core/layout/footer/footer.component';

@Component({
  selector: 'app-page',
  imports: [
    HeroComponent,
    FeaturesComponent,
    MainHeaderComponent,
    FooterComponent
  ],
  templateUrl: './page.component.html',
})
export class PageComponent {

}
