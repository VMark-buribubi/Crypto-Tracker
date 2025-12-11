import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites = signal<string[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const data = localStorage.getItem('cryptoFavorites');
    if (data) {
      this.favorites.set(JSON.parse(data));
    }
  }

  toggleFavorite(coinId: string) {
    const currentFavs = this.favorites();
    let newFavs;

    if (currentFavs.includes(coinId)) {
      newFavs = currentFavs.filter((id) => id !== coinId);
    } else {
      newFavs = [...currentFavs, coinId];
    }

    this.favorites.set(newFavs);
    localStorage.setItem('cryptoFavorites', JSON.stringify(newFavs));
  }

  isFavorite(coinId: string): boolean {
    return this.favorites().includes(coinId);
  }
}
