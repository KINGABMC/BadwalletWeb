import { Routes } from '@angular/router';

export const routes: Routes = [
  // ==========================================
  // ⚙️ ESPACE AGENT DE GUICHET (ADMIN)
  // ==========================================
  {
    path: 'admin/wallets',
    loadComponent: () => import('./features/wallet-management/wallet-list/wallet-list')
      .then(m => m.WalletListComponent)
  },
  {
    path: 'admin/wallets/create',
    loadComponent: () => import('./features/wallet-management/wallet-create/wallet-create')
      .then(m => m.WalletCreateComponent)
  },
  {
    path: 'admin/wallets/actions',
    loadComponent: () => import('./features/wallet-management/wallet-actions/wallet-actions')
      .then(m => m.WalletActionsComponent)
  },

  // ==========================================
  // 👤 ESPACE CLIENT FINAL (SELF-SERVICE)
  // ==========================================
  {
    path: 'client/dashboard',
    loadComponent: () => import('./features/transactions/dashboard/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'client/transfer',
    loadComponent: () => import('./features/transactions/transfert/transfert') // Vérifie bien si ton fichier s'appelle 'transfert.ts' ou 'transfer.component.ts'
      .then(m => m.TransferComponent)
  },
  {
    path: 'client/factures',
    loadComponent: () => import('./features/transactions/factures/factures')
      .then(m => m.FacturesComponent)
  },

  // ==========================================
  // 🔄 REDIRECTION PAR DÉFAUT
  // ==========================================
  { path: '', redirectTo: 'admin/wallets', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/wallets' } // Sécurité pour les fausses URLs
];