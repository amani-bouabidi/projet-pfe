import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  toggle(): void {
    console.log('SidebarService toggle called, current state:', this.sidebarState.value);
    this.sidebarState.next(!this.sidebarState.value);
  }

  open(): void {
    this.sidebarState.next(true);
  }

  close(): void {
    this.sidebarState.next(false);
  }

  getState(): boolean {
    return this.sidebarState.value;
  }
}
