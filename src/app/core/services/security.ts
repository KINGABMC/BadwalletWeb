import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  // Signal global accessible partout pour connaître le rôle de l'utilisateur connecté
  public currentUserRole = signal<'AGENT' | 'CLIENT' | null>(null);

  // Méthode de connexion rapide pour la démo/soutenance
  login(role: 'AGENT' | 'CLIENT') {
    this.currentUserRole.set(role);
  }

  // Méthode de déconnexion
  logout() {
    this.currentUserRole.set(null);
  }
}