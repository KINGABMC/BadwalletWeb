import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WalletApiService } from '../../../core/services/wallet-api';
import { XofPipe } from '../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-wallet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, XofPipe],
  templateUrl: './wallet-list.html',
  styleUrl: './wallet-list.css'
})
export class WalletListComponent implements OnInit {
  private walletApi = inject(WalletApiService);

  wallets: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadWallets();
  }

  loadWallets(): void {
    this.isLoading = true;
    this.walletApi.getWallets(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        // Gestion adaptative selon la structure renvoyée par Spring Boot (PageImpl ou tableau brut)
        if (response && response.content) {
          this.wallets = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        } else {
          this.wallets = Array.isArray(response) ? response : [];
          this.totalPages = 1;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des portefeuilles', err);
        this.isLoading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadWallets();
    }
  }
}