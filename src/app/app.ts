import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="logo">BadWallet Dashboard</div>
      <div class="nav-links">
        <span class="section-title">⚙️ Agent:</span>
        <a routerLink="/admin/wallets" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Portefeuilles</a>
        <a routerLink="/admin/wallets/create" routerLinkActive="active">Inscrire Client</a>
        <a routerLink="/admin/wallets/actions" routerLinkActive="active">Dépôt / Retrait</a>
        
        <span class="section-title">👤 Client:</span>
        <a routerLink="/client/dashboard" routerLinkActive="active">Mon Espace</a>
        <a routerLink="/client/transfer" routerLinkActive="active">Transfert</a>
        <a routerLink="/client/factures" routerLinkActive="active">Factures</a>
      </div>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar { display: flex; justify-content: space-between; align-items: center; background-color: #1e293b; color: white; padding: 1rem 2rem; font-family: sans-serif; }
    .logo { font-weight: bold; font-size: 1.25rem; }
    .section-title { font-size: 0.85rem; color: #94a3b8; text-transform: uppercase; margin-left: 1rem; letter-spacing: 0.05em;}
    .nav-links a { color: #cbd5e1; text-decoration: none; margin-left: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 4px; font-size: 0.95rem; }
    .nav-links a:hover { color: white; background-color: #334155; }
    .nav-links a.active { color: white; background-color: #2563eb; font-weight: bold; }
    .container { padding: 2rem; font-family: sans-serif; }
  `]
})
export class App {}