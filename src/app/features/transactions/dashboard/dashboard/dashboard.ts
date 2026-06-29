import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WalletApiService } from '../../../../core/services/wallet-api';
import { BalanceStore } from '../../../../core/services/balance-store';
import { XofPipe } from '../../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, XofPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private walletApi = inject(WalletApiService);
  public balanceStore = inject(BalanceStore); // Injecté en public pour être lu par le HTML

  clientPhone: string = '';
  isLoggedIn: boolean = false;
  transactions: any[] = [];
  isLoadingTransactions: boolean = false;

  onLogin(): void {
    if (!this.clientPhone.trim()) return;

    // Connecte l'utilisateur dans le Store réactif global (Signals)
    this.balanceStore.setCurrentUser(this.clientPhone.trim());
    this.isLoggedIn = true;
    
    // Charge l'historique des transactions
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoadingTransactions = true;
    this.walletApi.getTransactions(this.clientPhone.trim()).subscribe({
      next: (data) => {
        this.transactions = data || [];
        this.isLoadingTransactions = false;
      },
      error: (err) => {
        console.error('Erreur historique transactions', err);
        this.isLoadingTransactions = false;
      }
    });
  }
}