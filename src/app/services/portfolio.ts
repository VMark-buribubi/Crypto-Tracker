import { Injectable, signal, effect } from '@angular/core';
import { Holding } from '../models/holding';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  holdings = signal<Holding[]>([]);

  constructor() {
    this.loadHoldings();

    effect(() => {
      localStorage.setItem('cryptoHoldings', JSON.stringify(this.holdings()));
    });
  }

  private loadHoldings() {
    const data = localStorage.getItem('cryptoHoldings');
    if (data) {
      this.holdings.set(JSON.parse(data));
    }
  }

  addHolding(holding: Holding) {
    this.holdings.update((list) => [...list, holding]);
  }

  updateHolding(id: string, updatedData: Partial<Holding>) {
    this.holdings.update((list) => list.map((h) => (h.id === id ? { ...h, ...updatedData } : h)));
  }

  deleteHolding(id: string) {
    this.holdings.update((list) => list.filter((h) => h.id !== id));
  }
}
