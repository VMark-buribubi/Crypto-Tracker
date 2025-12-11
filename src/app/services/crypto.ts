import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getMarkets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
  }

  getCoinDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coins/${id}`);
  }

  getCoinHistory(id: string, days: number = 7): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days.toString(),
      },
    });
  }
}
