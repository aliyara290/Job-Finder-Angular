import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private filterKeywordSubject = new BehaviorSubject<string>('');
  filterValue$ = this.filterKeywordSubject.asObservable();

  private filterLocationSubject = new BehaviorSubject<string>('');
  filterLocation$ = this.filterLocationSubject.asObservable();

  setFilterKeywordValue(keyword: string) {
    this.filterKeywordSubject.next(keyword);
  }

  setFilterLocationValue(location: string) {
    this.filterLocationSubject.next(location);
  }

  get keyword(): string {
    return this.filterKeywordSubject.value;
  }

  get location(): string {
    return this.filterLocationSubject.value;
  }
}
