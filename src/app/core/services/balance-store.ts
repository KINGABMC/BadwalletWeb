import { Injectable, signal, inject } from '@angular/core';
import { WalletApiService } from './wallet-api';

@Injectable({
  providedIn: 'root'
})
export class BalanceStore {
  private walletApi = inject(WalletApiService);
  readonly balance = signal<number>(0);
  private currentPhone: string = '';

  setCurrentUser(phone: string): void {
    this.currentPhone = phone;
    this.refresh();
  }

  refresh(): void {
    if (!this.currentPhone) return;
    this.walletApi.getBalance(this.currentPhone).subscribe({
      next: (amount: number) => {
        this.balance.set(amount);
      },
      error: (err: unknown) => {
        console.error('Erreur du store solde:', err);
      }
    });
  }
}