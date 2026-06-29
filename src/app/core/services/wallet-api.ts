import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces pour typer proprement nos requêtes (Data Transfer Objects)
export interface WalletCreationRequest {
  phoneNumber: string;
  email: string;
  initialBalance: number;
  currency: string;
}

export interface TransferDto {
  sourcePhoneNumber: string;
  destinationPhoneNumber: string;
  amount: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WalletApiService {
  private http = inject(HttpClient);
  private readonly BASE = 'http://localhost:8080/api/wallets'; // [cite: 75]

  // --- ESPACE AGENT DE GUICHET ---

  // GET /api/wallets?page=0&size=10 (Tableau paginé) [cite: 14]
  getWallets(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.BASE}?page=${page}&size=${size}`);
  }

  // POST /api/wallets (Création d'un portefeuille) [cite: 17]
  createWallet(payload: WalletCreationRequest): Observable<any> {
    return this.http.post<any>(this.BASE, payload);
  }

  // GET /api/wallets/{phone} (Recherche par numéro de téléphone) [cite: 21]
  getWalletByPhone(phone: string): Observable<any> {
    return this.http.get<any>(`${this.BASE}/${phone}`);
  }

  // POST /api/wallets/{id}/deposit (Dépôt d'argent) [cite: 24]
  deposit(id: number, amount: number): Observable<any> {
    return this.http.post<any>(`${this.BASE}/${id}/deposit`, { amount });
  }

  // POST /api/wallets/withdraw (Retrait d'argent) [cite: 25]
  withdraw(payload: { phoneNumber: string; amount: number }): Observable<any> {
    return this.http.post<any>(`${this.BASE}/withdraw`, payload);
  }

  // --- ESPACE CLIENT FINAL ---

  // GET /api/wallets/{phone}/balance (Solde en temps réel) [cite: 30, 78]
  getBalance(phone: string): Observable<number> {
    return this.http.get<number>(`${this.BASE}/${phone}/balance`);
  }

  // POST /api/wallets/transfer (Transfert d'argent de compte à compte) [cite: 34, 81]
  transfer(payload: TransferDto): Observable<void> {
    return this.http.post<void>(`${this.BASE}/transfer`, payload);
  }

  // GET /api/wallets/{phone}/transactions (Historique des mouvements) [cite: 44]
  getTransactions(phone: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE}/${phone}/transactions`);
  }
}