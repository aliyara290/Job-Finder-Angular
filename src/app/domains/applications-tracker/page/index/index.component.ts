import { Component } from '@angular/core';
import { ApplicationListComponent } from '../../components/application-list/application-list.component';

@Component({
    selector: 'app-index',
    imports: [ApplicationListComponent],
    templateUrl: './index.component.html',
})
export class IndexComponent { }
