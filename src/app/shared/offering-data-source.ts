import {MatTableDataSource} from '@angular/material/table';
import {Offering} from './offering';
import {OfferingService} from './offering.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';

export class OfferingDataSource implements DataSource<Offering> {

  constructor(private offeringService: OfferingService) {}

  connect(): Observable<Offering[]> {
    return this.offeringService.getOfferings();
  }

  disconnect(): void {
  }
}
