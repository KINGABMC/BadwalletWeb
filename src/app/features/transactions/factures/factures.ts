import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BalanceStore } from '../../../core/services/balance-store';
import { WalletApiService } from '../../../core/services/wallet-api';
import { XofPipe } from '../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, 
    XofPipe
  ],
  templateUrl: './factures.html',
  styleUrl: './factures.css'
})
export class FacturesComponent implements OnInit {
  private fb = inject(FormBuilder);
  public balanceStore = inject(BalanceStore);
  private walletApi = inject(WalletApiService);

  factureForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Liste des prestataires locaux demandés par le sujet
  prestataires = [
    { code: 'SENELEC', name: "Senelec (Électricité)" },
    { code: 'WOYOFAL', name: "Woyofal (Crédit d'énergie)" },
    { code: 'SENEAU', name: "Sen'Eau (Eau)" },
    { code: 'ORANGE', name: "Orange (Crédit / Rapido)" }
  ];

  ngOnInit(): void {
    // Récupération automatique du numéro du client connecté depuis le Store réactif
    const sourcePhone = (this.balanceStore as any).currentPhone || '';

    this.factureForm = this.fb.group({
      sourcePhoneNumber: [sourcePhone, [Validators.required]],
      prestataire: ['', [Validators.required]],
      referenceFacture: ['', [Validators.required, Validators.minLength(5)]],
      amount: [null, [Validators.required, Validators.min(100)]]
    });
  }

  onSubmit(): void {
    if (this.factureForm.invalid) {
      this.factureForm.markAllAsTouched();
      return;
    }

    const amount = this.factureForm.value.amount;
    
    // Validation stricte du solde à l'aide du Signal avant de lancer la requête
    if (amount > this.balanceStore.balance()) {
      this.errorMessage = "Solde insuffisant pour régler cette facture.";
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Préparation du payload de transfert vers le compte virtuel du prestataire sélectionné
    const payload = {
      sourcePhoneNumber: this.factureForm.value.sourcePhoneNumber,
      destinationPhoneNumber: this.factureForm.value.prestataire,
      amount: amount,
      description: `Paiement Facture ${this.factureForm.value.prestataire} - Réf: ${this.factureForm.value.referenceFacture}`
    };

    this.walletApi.transfer(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = `Paiement de ${amount} XOF validé auprès de ${this.factureForm.value.prestataire} !`;
        
        // Rafraîchissement automatique et réactif du solde global de l'application (Signals)
        this.balanceStore.refresh();
        
        // Réinitialisation partielle du formulaire pour le confort visuel de l'utilisateur
        this.factureForm.get('referenceFacture')?.reset();
        this.factureForm.get('amount')?.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || "Le règlement de la facture a échoué.";
      }
    });
  }
}