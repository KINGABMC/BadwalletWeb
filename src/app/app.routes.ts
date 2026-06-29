import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/wallets',
    loadComponent: () => import('./features/wallet-management/wallet-list/wallet-list').then(m => m.WalletListComponent)
  },
  {
    path: 'admin/wallets/create',
    loadComponent: () => import('./features/wallet-management/wallet-create/wallet-create').then(m => m.WalletCreateComponent)
  },
  {
    path: 'admin/wallets/actions',
    loadComponent: () => import('./features/wallet-management/wallet-actions/wallet-actions').then(m => m.WalletActionsComponent)
  },
  { path: '', redirectTo: 'admin/wallets', pathMatch: 'full' }
];