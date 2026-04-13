import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarService } from '../../services/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDividerModule
  ],
  templateUrl: './header.html', // Make sure filename matches
  styleUrls: ['./header.scss'] // Make sure filename matches
})
export class HeaderComponent {
  @Output() logout = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  userName: string = 'John Doe';
  userEmail: string = 'john.doe@ira.tn';
  notificationCount: number = 3;

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar(): void {
    console.log('Toggling sidebar'); // Debug log
    this.sidebarService.toggle();
  }

  onLogout(): void {
    this.logout.emit();
  }

  onProfileClick(): void {
    this.profileClick.emit();
  }
}
