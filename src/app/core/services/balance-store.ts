import { Injectable, signal, inject } from '@angular/core';
import { WalletApiService } from './wallet-api.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceStore {
  private walletApi = inject(WalletApiService);
  readonly balance = signal<number>(0); [cite: 103]
  private currentPhone: string = '';

  setCurrentUser(phone: string) {
    this.currentPhone = phone;
    this.refresh();
  }

  refresh() {
    if (!this.currentPhone) return;
    this.walletApi.getBalance(this.currentPhone).subscribe({
      next: (amount) => this.balance.set(amount), [cite: 105]
      error: (err) => console.error('Erreur du store solde:', err)
    });
  }
}