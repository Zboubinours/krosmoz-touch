import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Offering} from './offering';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  public searchTerms = new BehaviorSubject<string>('');
  public offerings = new BehaviorSubject<Offering[]>([]);

  constructor(private http: HttpClient) {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.applySearch(term)),
    )
      .subscribe(value => this.offerings.next(value));
  }

  public getOfferings(): Observable<Offering[]> {
    return this.http.get<Offering[]>('./assets/krosmoz.json')
      .pipe(
        tap(value => console.log(value)),
        map(offerings => offerings
          .filter((offering: Offering) => {
              const now = moment().subtract(1, 'day');
              const date = moment(offering.date, 'DD/MM/YYYY');
              return date.isAfter(now);
            }
          )
        )
      );
  }

  public searchOfferings(term: string): void {
    this.searchTerms.next(term);
  }

  private applySearch(term: string): Observable<Offering[]> {
    term = term && term.trim().toLowerCase();
    if (!term) {
      // if not search term, return empty hero array.
      return this.getOfferings();
    }
    return this.getOfferings().pipe(
      map(offerings => offerings.filter((offering: Offering) => {
        return Object.values(offering).map(x => x == null ? '' : x.toString()).join('').trim().toLowerCase().includes(term);
      }))
    );
  }
}
