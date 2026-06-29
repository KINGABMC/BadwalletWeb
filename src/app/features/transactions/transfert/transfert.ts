import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WalletApiService } from '../../../core/services/wallet-api';
import { BalanceStore } from '../../../core/services/balance-store';
import { XofPipe } from '../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, XofPipe],
  templateUrl: './transfert.html',
  styleUrl: './transfert.css'
})
export class TransferComponent implements OnInit {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);
  public balanceStore = inject(BalanceStore);
  private router = inject(Router);

  transferForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  ngOnInit(): void {
    // On récupère le numéro de l'expéditeur depuis la session ou notre balanceStore
    // Si l'utilisateur n'est pas connecté, on simule ou on l'invite à se connecter
    const sourcePhone = (this.balanceStore as any).currentPhone || '';

    this.transferForm = this.fb.group({
      sourcePhoneNumber: [sourcePhone, [Validators.required]],
      destinationPhoneNumber: ['', [Validators.required, Validators.pattern(/^\+221(77|78|76|70|75)\d{7}$/)]],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(100)]]
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const amount = this.transferForm.value.amount;
    // Vérification locale du solde réactif via le Signal avant l'envoi
    if (amount > this.balanceStore.balance()) {
      this.errorMessage = "Solde insuffisant pour effectuer ce transfert.";
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.walletApi.transfer(this.transferForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = `Transfert de ${amount} XOF effectué avec succès !`;
        
        // --- RÉACTIVITÉ DES SIGNALS ---
        // On force le rafraîchissement immédiat du solde dans toute l'application
        this.balanceStore.refresh();
        
        this.transferForm.get('destinationPhoneNumber')?.reset();
        this.transferForm.get('amount')?.reset();
        this.transferForm.get('description')?.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || "L'opération de transfert a échoué.";
      }
    });
  }
}