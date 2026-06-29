import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BalanceStore } from '../../../core/services/balance-store';
import { SecurityService } from '../../../core/services/security';
import { XofPipe } from '../../../shared/pipes/xof-pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, XofPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public balanceStore = inject(BalanceStore);
  public securityService = inject(SecurityService); // Mis en public pour être lu dans le HTML
  private router = inject(Router);

  onLogout() {
    this.securityService.logout();
    this.router.navigate(['/public/login']);
  }
}