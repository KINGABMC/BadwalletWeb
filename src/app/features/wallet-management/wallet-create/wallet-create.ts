import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WalletApiService } from '../../../core/services/wallet-api';

@Component({
  selector: 'app-wallet-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './wallet-create.html',
  styleUrl: './wallet-create.css'
})
export class WalletCreateComponent {
  private fb = inject(FormBuilder);
  private walletApi = inject(WalletApiService);
  private router = inject(Router);

  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Création du formulaire réactif avec les validations requises
  walletForm: FormGroup = this.fb.group({
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+221(77|78|76|70|75)\d{7}$/)]],
    email: ['', [Validators.required, Validators.email]],
    initialBalance: [0, [Validators.required, Validators.min(0)]],
    currency: ['XOF', Validators.required]
  });

  onSubmit(): void {
    if (this.walletForm.invalid) {
      this.walletForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.walletApi.createWallet(this.walletForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/wallets']); // Redirection vers le listing
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || "Une erreur est survenue lors de la création.";
      }
    });
  }
}