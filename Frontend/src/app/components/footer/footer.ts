import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import this
import { trigger, transition, style, animate } from '@angular/animations';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule // Add this here
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email: string = '';
  isSubscribing = false;

  // Quick Links
  quickLinks: FooterLink[] = [
    { label: 'Accueil', url: '/' },
    { label: 'À propos', url: '/about' },
    { label: 'Domaines', url: '/domaines' },
    { label: 'Recherche', url: '/research' },
    { label: 'Actualités', url: '/news' },
    { label: 'Contact', url: '/contact' }
  ];

  // Services Links
  servicesLinks: FooterLink[] = [
    { label: 'Formation', url: '/formation' },
    { label: 'Recherche', url: '/recherche' },
    { label: 'Innovation', url: '/innovation' },
    { label: 'Bibliothèque', url: '/library' },
    { label: 'Carrières', url: '/careers' },
    { label: 'Partenariats', url: '/partnerships' }
  ];

  // Legal Links
  legalLinks: FooterLink[] = [
    { label: 'Mentions légales', url: '/legal', external: false },
    { label: 'Confidentialité', url: '/privacy', external: false },
    { label: 'CGU', url: '/terms', external: false },
    { label: 'Accessibilité', url: '/accessibility', external: false }
  ];

  // Social Links
  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/ira', color: '#1877f2' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/ira', color: '#1da1f2' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company/ira', color: '#0077b5' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/ira', color: '#e4405f' },
    { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/ira', color: '#ff0000' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/ira', color: '#333333' }
  ];

  constructor(private snackBar: MatSnackBar) {}

  subscribeNewsletter(): void {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.snackBar.open('Veuillez entrer une adresse email valide', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.isSubscribing = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubscribing = false;
      this.snackBar.open('Merci pour votre inscription à notre newsletter !', 'Fermer', {
        duration: 4000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.email = '';
    }, 1000);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSocialClick(social: SocialLink): void {
    console.log(`Opening ${social.name}: ${social.url}`);
    window.open(social.url, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
