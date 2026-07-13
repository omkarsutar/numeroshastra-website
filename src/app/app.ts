import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService, languageOptions } from './translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('numeroshastra-website');
  isMobileMenuOpen = signal(false);
  showLanguageDialog = signal(false);
  readonly languageOptions = languageOptions;

  constructor(public readonly translation: TranslationService) {
    if (!this.translation.storedLanguageExists()) {
      setTimeout(() => this.showLanguageDialog.set(true), 7000);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  selectLanguage(code: 'en' | 'hi' | 'mr') {
    this.translation.setLanguage(code);
    this.showLanguageDialog.set(false);
  }
}
