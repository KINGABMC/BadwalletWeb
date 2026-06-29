import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SecurityService } from '../../../core/services/security';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private securityService = inject(SecurityService);
  private router = inject(Router);

  connectAs(role: 'AGENT' | 'CLIENT') {
    // 1. On enregistre le rôle dans le signal global
    this.securityService.login(role);
    
    // 2. On redirige vers la bonne page d'accueil selon le rôle
    if (role === 'AGENT') {
      this.router.navigate(['/private/admin/wallets']);
    } else {
      this.router.navigate(['/private/client/dashboard']);
    }
  }
}