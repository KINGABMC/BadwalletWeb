import { Routes } from '@angular/router';

// Imports des structures enveloppes (Features)
import { PublicFeature } from './features/public/public';
import { Private } from './layouts/private/private'; // S'adapte au nom exporté dans ton private.ts

// Imports des composants de l'Espace Public
import { Login } from './features/public/login/login';

// Imports des composants de l'Espace Agent (Admin)
import { WalletListComponent } from './features/private/wallet-management/wallet-list/wallet-list';
import { WalletCreateComponent } from './features/private/wallet-management/wallet-create/wallet-create';
import { WalletActionsComponent } from './features/private/wallet-management/wallet-actions/wallet-actions';

// Imports des composants de l'Espace Client
import { DashboardComponent } from './features/private/dashboard/dashboard';
import { TransferComponent } from './features/private/transfert/transfert';
import { FacturesComponent } from './features/private/factures/factures';
import { PrivateComponent } from './features/private/private';

export const routes: Routes = [
  // ==========================================
  // 🔓 ZONE PUBLIQUE
  // ==========================================
  { 
    path: 'public', 
    component: PublicFeature,
    children: [
      { path: 'login', component: Login },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // ==========================================
  // 🔒 ZONE PRIVÉE
  // ==========================================
  { 
    path: 'private', 
    component: PrivateComponent,
    children: [
      // ⚙️ Routes Agent (Admin)
      { path: 'admin/wallets', component: WalletListComponent },
      { path: 'admin/wallets/create', component: WalletCreateComponent },
      { path: 'admin/wallets/actions', component: WalletActionsComponent },

      // 👤 Routes Client
      { path: 'client/dashboard', component: DashboardComponent },
      { path: 'client/transfer', component: TransferComponent },
      { path: 'client/factures', component: FacturesComponent },

      // Redirection interne de la zone privée
      { path: '', redirectTo: 'client/dashboard', pathMatch: 'full' }
    ]
  },

  // ==========================================
  // 🔄 REDIRECTIONS GLOBALES
  // ==========================================
  { path: '', redirectTo: '/public/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/public/login' }
];