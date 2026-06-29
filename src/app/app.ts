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
        <a routerLink="/admin/wallets" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Liste Portefeuilles</a>
        <a routerLink="/admin/wallets/create" routerLinkActive="active">Inscrire Client</a>
        <a routerLink="/admin/wallets/actions" routerLinkActive="active">Dépôt / Retrait</a>
      </div>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1e293b;
      color: white;
      padding: 1rem 2rem;
      font-family: sans-serif;
    }
    .logo { font-weight: bold; font-size: 1.25rem; }
    .nav-links a {
      color: #cbd5e1;
      text-decoration: none;
      margin-left: 1.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      font-size: 0.95rem;
    }
    .nav-links a:hover { color: white; background-color: #334155; }
    .nav-links a.active { color: white; background-color: #2563eb; font-weight: bold; }
    .container { padding: 2rem; font-family: sans-serif; }
  `]
})
export class App {}