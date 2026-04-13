import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarService } from '../../services/sidebar';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatRippleModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state('collapsed', style({
        height: '0px',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = false;
  private subscription: Subscription | null = null;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      expanded: false
    },
    {
      label: 'Users Management',
      icon: 'people',
      expanded: false,
      children: [
        { label: 'All Users', icon: 'person', route: '/users/all' },
        { label: 'Add User', icon: 'person_add', route: '/users/add' },
        { label: 'Roles', icon: 'security', route: '/users/roles' },
        { label: 'Permissions', icon: 'lock', route: '/users/permissions' }
      ]
    },
    {
      label: 'Catalogue',
      icon: 'inventory',
      expanded: false,
      children: [
        { label: 'Products', icon: 'shopping_bag', route: '/catalogue/products' },
        { label: 'Categories', icon: 'category', route: '/catalogue/categories' },
        { label: 'Brands', icon: 'branding_watermark', route: '/catalogue/brands' },
        { label: 'Stock', icon: 'inventory', route: '/catalogue/stock' }
      ]
    },
    {
      label: 'Orders',
      icon: 'shopping_cart',
      expanded: false,
      children: [
        { label: 'All Orders', icon: 'list_alt', route: '/orders/all' },
        { label: 'Pending', icon: 'pending', route: '/orders/pending' },
        { label: 'Completed', icon: 'check_circle', route: '/orders/completed' },
        { label: 'Returns', icon: 'return', route: '/orders/returns' }
      ]
    },
    {
      label: 'Reports',
      icon: 'bar_chart',
      expanded: false,
      children: [
        { label: 'Sales Report', icon: 'trending_up', route: '/reports/sales' },
        { label: 'Inventory Report', icon: 'assessment', route: '/reports/inventory' },
        { label: 'User Report', icon: 'people', route: '/reports/users' }
      ]
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
      expanded: false
    }
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.subscription = this.sidebarService.sidebarState$.subscribe(state => {
      this.isOpen = state;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeSidebar(): void {
    this.sidebarService.close();
  }

  toggleDropdown(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    } else {
      this.closeSidebar();
    }
  }

  isActiveRoute(route: string): boolean {
    // You can implement active route detection
    return window.location.pathname === route;
  }
}
