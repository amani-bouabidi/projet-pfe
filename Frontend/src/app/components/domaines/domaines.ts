import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
// Add animations import
import { trigger, transition, style, animate } from '@angular/animations';

export interface Domaine {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-domaines',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './domaines.html',
  styleUrls: ['./domaines.scss'],
  // Add animations here
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DomainesComponent {
  domaines: Domaine[] = [
    {
      id: 1,
      title: 'Agriculture',
      icon: 'agriculture',
      description: 'Études des systèmes agricoles durables et innovation agronomique',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Biologie',
      icon: 'science',
      description: 'Recherche en sciences biologiques et biotechnologies',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Informatique',
      icon: 'computer',
      description: 'Technologies numériques, IA et développement logiciel',
      color: '#9C27B0'
    },
    {
      id: 4,
      title: 'Chimie',
      icon: 'biotech',
      description: 'Chimie organique, inorganique et analytique',
      color: '#FF9800'
    },
    {
      id: 5,
      title: 'Physique',
      icon: 'bolt',
      description: 'Physique théorique, appliquée et quantique',
      color: '#F44336'
    }
  ];

  breakpoint: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onResize();
  }

  onResize(): void {
    const width = window.innerWidth;
    if (width <= 480) {
      this.breakpoint = 1;
    } else if (width <= 768) {
      this.breakpoint = 2;
    } else if (width <= 1024) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 5;
    }
  }

  onDomaineClick(domaine: Domaine): void {
    console.log('Navigating to:', domaine.id, domaine.title);
    this.router.navigate(['/domaines', domaine.id, 'formations']);
  }
}
