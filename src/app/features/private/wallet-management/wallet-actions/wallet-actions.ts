import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WalletApiService } from '../../../../core/services/wallet-api';
import { XofPipe } from '../../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-wallet-actions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, XofPipe],
  templateUrl: './wallet-actions.html',
  styleUrl: './wallet-actions.css'
})
export class WalletActionsComponent {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);

  // Recherche
  searchPhone: string = '';
  foundWallet: any = null;
  searchError: string = '';
  isSearching: boolean = false;

  // Formulaires opérationnels
  depositForm: FormGroup;
  withdrawForm: FormGroup;
  
  successMessage: string = '';
  actionError: string = '';

  constructor() {
    this.depositForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]]
    });

    this.withdrawForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSearch(): void {
    if (!this.searchPhone.trim()) return;
    
    this.isSearching = true;
    this.searchError = '';
    this.foundWallet = null;
    this.successMessage = '';
    this.actionError = '';

    this.walletApi.getWalletByPhone(this.searchPhone.trim()).subscribe({
      next: (wallet) => {
        this.foundWallet = wallet;
        this.isSearching = false;
      },
      error: (err) => {
        this.searchError = err?.error?.message || "Aucun portefeuille trouvé pour ce numéro.";
        this.isSearching = false;
      }
    });
  }

  onDeposit(): void {
    if (this.depositForm.invalid || !this.foundWallet) return;
    
    this.successMessage = '';
    this.actionError = '';
    const amount = this.depositForm.value.amount;

    this.walletApi.deposit(this.foundWallet.id, amount).subscribe({
      next: (updatedWallet) => {
        this.successMessage = `Dépôt de ${amount} XOF effectué avec succès !`;
        this.foundWallet = updatedWallet; // Met à jour le solde affiché
        this.depositForm.reset();
      },
      error: (err) => {
        this.actionError = err?.error?.message || "Le dépôt a échoué.";
      }
    });
  }

  onWithdraw(): void {
    if (this.withdrawForm.invalid || !this.foundWallet) return;

    this.successMessage = '';
    this.actionError = '';
    const amount = this.withdrawForm.value.amount;

    const payload = {
      phoneNumber: this.foundWallet.phoneNumber,
      amount: amount
    };

    this.walletApi.withdraw(payload).subscribe({
      next: (updatedWallet) => {
        this.successMessage = `Retrait de ${amount} XOF effectué avec succès !`;
        this.foundWallet = updatedWallet; // Met à jour le solde affiché
        this.withdrawForm.reset();
      },
      error: (err) => {
        this.actionError = err?.error?.message || "Le retrait a échoué (fonds insuffisants ?).";
      }
    });
  }
}