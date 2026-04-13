import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export interface Domaine {
  id: number;
  title: string;
  icon: string;
  description: string;
  route: string;
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
    MatDivider
  ],
  templateUrl: './domaines.html',
  styleUrls: ['./domaines.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.domaine-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.4, 0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
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
      route: '/topics/agriculture',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Biologie',
      icon: 'science',
      description: 'Recherche en sciences biologiques et biotechnologies',
      route: '/topics/biologie',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Informatique',
      icon: 'computer',
      description: 'Technologies numériques, IA et développement logiciel',
      route: '/topics/informatique',
      color: '#9C27B0'
    },
    {
      id: 4,
      title: 'Chimie',
      icon: 'biotech',
      description: 'Chimie organique, inorganique et analytique',
      route: '/topics/chimie',
      color: '#FF9800'
    },
    {
      id: 5,
      title: 'Physique',
      icon: 'bolt',
      description: 'Physique théorique, appliquée et quantique',
      route: '/topics/physique',
      color: '#F44336'
    },
    {
      id: 6,
      title: 'Mathématiques',
      icon: 'calculate',
      description: 'Mathématiques pures, appliquées et statistiques',
      route: '/topics/mathematiques',
      color: '#00BCD4'
    },
    {
      id: 7,
      title: 'Géologie',
      icon: 'terrain',
      description: 'Étude de la Terre, ressources minérales et géotechnique',
      route: '/topics/geologie',
      color: '#8D6E63'
    },
    {
      id: 8,
      title: 'Environnement',
      icon: 'eco',
      description: 'Sciences environnementales et développement durable',
      route: '/topics/environnement',
      color: '#4CAF50'
    },
    {
      id: 9,
      title: 'Médecine',
      icon: 'local_hospital',
      description: 'Sciences médicales et recherche biomédicale',
      route: '/topics/medecine',
      color: '#E91E63'
    },
    {
      id: 10,
      title: 'Économie',
      icon: 'trending_up',
      description: 'Économie, finance et gestion d\'entreprise',
      route: '/topics/economie',
      color: '#FFC107'
    }
  ];

  // For responsive grid
  breakpoint: number = 5;

  constructor() {}

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
    console.log('Domaine selected:', domaine.title);
    console.log('Icon:', domaine.icon);
    // Navigation logic
    // this.router.navigate([domaine.route]);
  }
}
