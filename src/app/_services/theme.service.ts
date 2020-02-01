import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    document.body.className = this.getTheme();
  }

  getTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      return theme;
    } else {
      this.setTheme('light');
      return 'light';
    }
  }

  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }

  swapTheme() {
    if (this.getTheme() === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }
}
