import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidenav: MatSidenav;

  constructor() { }

  public toggle(): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(true)
  }

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
    setInterval(() => this.sidenav.toggle(), 1000)
  }
}
