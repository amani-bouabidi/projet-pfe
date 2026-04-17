import { Component, OnInit } from '@angular/core';
import { ApprenantService } from '../../../services/apprenant';
import { HeaderComponent } from '../../../components/header/header';
import { SidebarComponent } from '../../../components/sidebar/sidebar';
import { HeroCarouselComponent } from '../../../components/hero-carousel/hero-carousel';
import { DomainesComponent } from '../../../components/domaines/domaines';
import { FooterComponent } from '../../../components/footer/footer';
import { AdminFormateursComponent } from '../../../admin/components/formateurs/formateurs';
import { FormationStepperComponent } from '../../../components/formation-stepper/formation-stepper';
import { PrerequisQcmComponent } from '../../../components/prerequis-qcm/prerequis-qcm';

@Component({
  selector: 'app-catalogue',
  imports: [HeaderComponent, SidebarComponent, HeroCarouselComponent, DomainesComponent, FooterComponent, AdminFormateursComponent, FormationStepperComponent, PrerequisQcmComponent  ],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.scss',
})
export class Catalogue implements OnInit {
  formations: any[] = [];
  categories: string[] = [];
  searchTerm = '';

  constructor(private apprenantService: ApprenantService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.apprenantService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
        if (data.length > 0 && 'categorie' in data[0]){
          this.categories = [...new Set(
            data.map(f => f.categorie).filter((c): c is string => !!c)
          )];
        }
      }
    });
  }

  search(): void {
    if (this.searchTerm) {
      this.apprenantService.getFormations().subscribe({
        next: (data) => {
          this.formations = data.filter(f => f.titre.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
      });
    } else {
      this.loadFormations();
    }
  }

}
