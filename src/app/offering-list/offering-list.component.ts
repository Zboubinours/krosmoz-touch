import {Component, OnInit, ViewChild} from '@angular/core';
import {Offering} from '../shared/offering';
import {Observable} from 'rxjs';
import {OfferingService} from '../shared/offering.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.css']
})
export class OfferingListComponent implements OnInit {

  columnsToDisplay = ['date', 'bonus', 'quantity', 'offering', 'description'];
  dataSource: MatTableDataSource<unknown>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private offeringService: OfferingService) {
  }

  ngOnInit(): void {
    this.offeringService.getOfferings().subscribe(offerings => {
      this.dataSource = new MatTableDataSource(offerings);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
