import {Component} from '@angular/core';
import {Filter} from './shared/filter';
import {OfferingService} from './shared/offering.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'krosmoz';

  filters: Filter[] = [
    {name: 'XP', search: 'expérience'},
    {name: 'Drop', search: 'butin'},
    {name: 'Économie d\'ingrédients', search: 'économie'},
    {name: 'Dragodindes', search: 'dragodindes'},
  ];

  constructor(private offeringService: OfferingService) {
  }

  searchOfferings(search: string) {
    this.offeringService.searchOfferings(search);
  }
}
