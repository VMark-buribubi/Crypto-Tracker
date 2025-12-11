import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto';
import { FavoritesService } from '../../services/favorites';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    BaseChartDirective,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  private route = inject(ActivatedRoute);
  private cryptoService = inject(CryptoService);
  favoritesService = inject(FavoritesService);

  coin = signal<any>(null);
  isLoading = signal<boolean>(true);

  lineChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Price (USD)',
        fill: true,
        tension: 0.5,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.3)',
      },
    ],
  });

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  lineChartLegend = true;

  ngOnInit(): void {
    const coinId = this.route.snapshot.paramMap.get('id');

    if (coinId) {
      this.cryptoService.getCoinDetails(coinId).subscribe({
        next: (data) => {
          this.coin.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });

      this.cryptoService.getCoinHistory(coinId).subscribe((data) => {
        const prices = data.prices;

        const chartLabels: string[] = [];
        const chartValues: number[] = [];

        prices.forEach((entry: any[]) => {
          const date = new Date(entry[0]);

          const dateLabel = `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;

          chartLabels.push(dateLabel);
          chartValues.push(entry[1]);
        });

        this.lineChartData.set({
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
              label: 'Price (USD)',
              fill: true,
              tension: 0.5,
              borderColor: '#3f51b5',
              backgroundColor: 'rgba(63, 81, 181, 0.3)',
              pointRadius: 0,
            },
          ],
        });
      });
    }
  }
}
