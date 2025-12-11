import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CryptoService } from '../../services/crypto';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';

import { FavoritesService } from '../../services/favorites';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatSlideToggle,
    MatPaginatorModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private cryptoService = inject(CryptoService);
  favoritesService = inject(FavoritesService);

  coins = signal<any[]>([]);
  searchTerm = signal<string>('');
  trendFilter = signal<string>('all');

  sortState = signal<Sort>({ active: 'market_cap', direction: 'desc' });

  showFavoritesOnly = signal<boolean>(false);

  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);

  filteredCoins = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const trend = this.trendFilter();
    const onlyFavs = this.showFavoritesOnly();
    const favIds = this.favoritesService.favorites();
    const allCoins = this.coins();
    const sort = this.sortState();

    let result = allCoins.filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(term) || coin.symbol.toLowerCase().includes(term);

      let matchesTrend = true;
      if (trend === 'positive') {
        matchesTrend = coin.price_change_percentage_24h > 0;
      } else if (trend === 'negative') {
        matchesTrend = coin.price_change_percentage_24h < 0;
      }

      const matchesFav = onlyFavs ? favIds.includes(coin.id) : true;

      return matchesSearch && matchesTrend && matchesFav;
    });

    if (sort.direction) {
      result = result.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        const column = sort.active;

        switch (column) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'current_price':
            return this.compare(a.current_price, b.current_price, isAsc);
          case 'price_change_percentage_24h':
            return this.compare(
              a.price_change_percentage_24h,
              b.price_change_percentage_24h,
              isAsc,
            );
          case 'market_cap':
            return this.compare(a.market_cap, b.market_cap, isAsc);
          default:
            return 0;
        }
      });
    }
    return result;
  });

  paginatedCoins = computed(() => {
    const allItems = this.filteredCoins();
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();

    return allItems.slice(startIndex, endIndex);
  });

  displayedColumns: string[] = [
    'fav',
    'image',
    'name',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];

  ngOnInit(): void {
    this.cryptoService.getMarkets().subscribe({
      next: (data) => {
        this.coins.set(data);
        console.log('Adatok megérkeztek:', data);
      },
      error: (err) => console.error('Hiba történt:', err),
    });
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.pageIndex.set(0);
  }

  updateTrend(value: string) {
    this.trendFilter.set(value);
    this.pageIndex.set(0);
  }

  sortData(sort: Sort) {
    this.sortState.set(sort);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  toggleFav(event: Event, coinId: string) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(coinId);
  }
}
