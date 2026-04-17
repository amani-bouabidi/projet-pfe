import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';


import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './formation-detail.html',
  styleUrls: ['./formation-detail.scss']
})
export class FormationDetailComponent implements OnInit {
  formation: any = null;
  domaineId: number | null = null;
  formationId: number | null = null;

  private formationsData = [
    {
      id: 1,
      titre: 'Agriculture Durable',
      description: 'Formation complète sur les techniques d\'agriculture durable et de permaculture.',
      formateurNom: 'Dr. Jean Dupont',
      modules: [
        {
          id: 1,
          titre: 'Module 1: Introduction à l\'Agriculture Durable',
          description: 'Découvrez les concepts fondamentaux de l\'agriculture durable',
          videos: [
            { id: 1, titre: 'Introduction aux concepts clés', duration: '15:30' },
            { id: 2, titre: 'Les principes fondamentaux', duration: '22:15' }
          ],
          documents: [
            { id: 1, nom: 'Cours_Agriculture_Durable.pdf', size: '2.5 MB' },
            { id: 2, nom: 'Exercices_Pratiques.pdf', size: '1.2 MB' }
          ]
        },
        {
          id: 2,
          titre: 'Module 2: Permaculture',
          description: 'Principes et pratiques de la permaculture',
          videos: [
            { id: 3, titre: 'Introduction à la Permaculture', duration: '18:45' }
          ],
          documents: [
            { id: 3, nom: 'Guide_Permaculture.pdf', size: '3.8 MB' },
            { id: 4, nom: 'Design_Permaculture.pdf', size: '4.2 MB' }
          ]
        },
        {
          id: 3,
          titre: 'Module 3: Gestion de l\'Eau',
          description: 'Techniques d\'irrigation et conservation de l\'eau',
          videos: [
            { id: 4, titre: 'Techniques d\'irrigation modernes', duration: '25:00' }
          ],
          documents: [
            { id: 5, nom: 'Systèmes_d_Irrigation.pdf', size: '5.1 MB' }
          ]
        }
      ]
    },
    {
      id: 2,
      titre: 'Agroécologie',
      description: 'Étude des écosystèmes agricoles et des pratiques agroécologiques.',
      formateurNom: 'Prof. Marie Martin',
      modules: [
        {
          id: 4,
          titre: 'Module 1: Introduction à l\'Agroécologie',
          description: 'Les bases de l\'agroécologie',
          videos: [
            { id: 5, titre: 'Qu\'est-ce que l\'agroécologie?', duration: '12:30' }
          ],
          documents: [
            { id: 6, nom: 'Introduction_Agroecologie.pdf', size: '3.2 MB' }
          ]
        }
      ]
    },
    {
      id: 3,
      titre: 'IA Moderne',
      description: 'Maîtrisez les concepts fondamentaux de l\'intelligence artificielle.',
      formateurNom: 'Dr. Lucas Petit',
      modules: [
        {
          id: 5,
          titre: 'Module 1: Introduction à l\'IA',
          description: 'Histoire et concepts de base',
          videos: [
            { id: 6, titre: 'Introduction à l\'IA', duration: '12:30' }
          ],
          documents: [
            { id: 7, nom: 'Introduction_IA.pdf', size: '3.2 MB' }
          ]
        },
        {
          id: 6,
          titre: 'Module 2: Machine Learning',
          description: 'Algorithmes de machine learning',
          videos: [
            { id: 7, titre: 'Les bases du Machine Learning', duration: '20:00' }
          ],
          documents: [
            { id: 8, nom: 'ML_Algorithmes.pdf', size: '6.5 MB' }
          ]
        }
      ]
    },
    {
      id: 4,
      titre: 'Web Development',
      description: 'Formation complète pour devenir développeur web full stack.',
      formateurNom: 'M. Pierre Robert',
      modules: [
        {
          id: 7,
          titre: 'Module 1: HTML/CSS',
          description: 'Les bases du HTML et CSS',
          videos: [
            { id: 8, titre: 'Introduction au HTML', duration: '15:00' },
            { id: 9, titre: 'Introduction au CSS', duration: '18:30' }
          ],
          documents: [
            { id: 9, nom: 'HTML_Cours.pdf', size: '2.8 MB' }
          ]
        },
        {
          id: 8,
          titre: 'Module 2: JavaScript',
          description: 'Les fondamentaux de JavaScript',
          videos: [
            { id: 10, titre: 'Introduction à JavaScript', duration: '22:00' }
          ],
          documents: [
            { id: 10, nom: 'JavaScript_Cours.pdf', size: '4.1 MB' }
          ]
        }
      ]
    },
    {
      id: 5,
      titre: 'Biologie',
      description: 'Introduction aux techniques de biologie moléculaire.',
      formateurNom: 'Dr. Sophie Bernard',
      modules: [
        {
          id: 9,
          titre: 'Module 1: ADN et Génétique',
          description: 'Structure de l\'ADN et principes génétiques',
          videos: [
            { id: 11, titre: 'Structure de l\'ADN', duration: '15:00' }
          ],
          documents: [
            { id: 11, nom: 'ADN_Structure.pdf', size: '4.1 MB' }
          ]
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.domaineId = +params['id'];
      this.formationId = +params['formationId'];
      this.loadFormation();
    });
  }

  loadFormation(): void {
    this.formation = this.formationsData.find(f => f.id === this.formationId);
  }

  goBack(): void {
    this.router.navigate(['/domaines', this.domaineId, 'formations']);
  }
}
