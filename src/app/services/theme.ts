import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      this.isDarkMode.set(JSON.parse(savedTheme));
    }

    effect(() => {
      const isDark = this.isDarkMode();

      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }

      localStorage.setItem('isDarkMode', JSON.stringify(isDark));
    });
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
  }
}
