import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth';
import { AuthLeft } from '../../../components/auth-left/auth-left';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,
           AuthLeft, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string= '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const data = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({

      next: () => {
        alert("Compte créé avec succés");
        this.router.navigate(['/login']);
      },

      error: () => {
        alert("Erreur lors de l'inscription")
      }
    })
  }

}
