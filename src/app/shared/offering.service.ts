import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offering} from './offering';
import {map, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  constructor(private http: HttpClient) {
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

  public searchOfferings(term: string): Observable<Offering[]> {
    term = term && term.trim().toLowerCase();
    console.log(term);
    if (!term) {
      console.log('empty');
      // if not search term, return empty hero array.
      return this.getOfferings();
    }
    console.log('not empty');
    return this.getOfferings().pipe(
      map(offerings => offerings.filter((offering: Offering) => {
        return Object.values(offering).map(x => x == null ? '' : x.toString()).join('').trim().toLowerCase().includes(term);
      }))
    );
  }
}
