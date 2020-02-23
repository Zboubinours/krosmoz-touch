import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Offering} from '../shared/offering';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {OfferingService} from '../shared/offering.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.css']
})
export class OfferingListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  offerings$: Observable<Offering[]>;
  dataSource: MatTableDataSource<Offering> = new MatTableDataSource<Offering>([]);
  private searchTerms = new BehaviorSubject<string>('');

  constructor(
    private offeringService: OfferingService,
    private changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.offerings$ = this.dataSource.connect();
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.offeringService.searchOfferings(term)),
    )
      .subscribe(value => this.dataSource.data = value);
  }


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  // }


  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getSrcImg(offering: Offering): string {
    return `/assets/items/${offering.img.split('/').pop()}`;
  }

  formatDate(date: Date): string {
    return moment(date, 'DD/MM/YYYY').locale('fr').format('D MMM');
  }
}
