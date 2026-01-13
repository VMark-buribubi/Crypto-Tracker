import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PortfolioService } from '../../services/portfolio';
import { CryptoService } from '../../services/crypto';
import { PortfolioDialog } from './portfolio-dialog/portfolio-dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  portfolioService = inject(PortfolioService);
  private cryptoService = inject(CryptoService);
  private dialog = inject(MatDialog);

  marketCoins = signal<any[]>([]);

  portfolioData = computed(() => {
    const holdings = this.portfolioService.holdings();
    const prices = this.marketCoins();

    return holdings.map((h) => {
      const currentCoin = prices.find((p) => p.id === h.coinId);
      const currentPrice = currentCoin ? currentCoin.current_price : h.cost;
      const totalValue = h.amount * currentPrice;
      const profit = totalValue - h.amount * h.cost;

      return {
        ...h,
        currentPrice,
        totalValue,
        profit,
      };
    });
  });

  totalBalance = computed(() =>
    this.portfolioData().reduce((acc, curr) => acc + curr.totalValue, 0),
  );

  displayedColumns = ['asset', 'price', 'balance', 'value', 'profit', 'actions'];

  ngOnInit() {
    this.cryptoService.getMarkets().subscribe((data) => {
      this.marketCoins.set(data);
    });
  }

  openDialog(element?: any) {
    const dialogRef = this.dialog.open(PortfolioDialog, {
      width: '400px',
      data: {
        coins: this.marketCoins(),
        element: element,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (element) {
          this.portfolioService.updateHolding(element.id, result);
        } else {
          const newId = Date.now().toString() + Math.random().toString().slice(2);
          this.portfolioService.addHolding({ ...result, id: newId });
        }
      }
    });
  }

  delete(id: string) {
    if (confirm('Are you sure you want to remove this asset?')) {
      this.portfolioService.deleteHolding(id);
    }
  }
}
