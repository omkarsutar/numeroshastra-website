import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-oracle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oracle-container container">
      <section class="oracle-hero">
        <div class="oracle-hero-content">
          <span class="badge">{{ t('oracle.heroBadge') }}</span>
          <h1 class="hero-title">{{ t('oracle.heroTitle') }}</h1>
          <p class="hero-subtitle">{{ t('oracle.heroSubtitle') }}</p>
          
          <div class="oracle-bullets">
            <div *ngFor="let item of translation.locale().oracle.bulletItems" class="bullet-item">
              <div class="bullet-icon"><i class="fas fa-check-circle"></i></div>
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="oracle-visual-container">
          <div class="mascot-wrapper floating">
            <img src="/oracle_mascot_1778239723409.png" alt="Oracle Mascot" class="mascot-img" />
            <div class="oracle-glow"></div>
          </div>

          <!-- Interactive Audio Mockup -->
          <div class="audio-player-card glass-panel">
            <div class="player-top">
              <div class="pulse-indicator" [class.playing]="isPlaying()"></div>
              <span>{{ isPlaying() ? t('oracle.playingReading') : t('oracle.audioReady') }}</span>
            </div>
             
            <h3 class="track-title">{{ t('oracle.trackTitle') }}</h3>
            <p class="track-artist">{{ t('oracle.trackArtist') }}</p>

            <div class="language-selector">
              <button 
                *ngFor="let lang of ['English', 'हिंदी', 'मराठी']" 
                class="lang-btn"
                [class.active]="selectedLanguage() === lang"
                (click)="setLanguage(lang)">
                {{ lang }}
              </button>
            </div>

            <!-- Waves animation -->
            <div class="audio-waves" [class.active]="isPlaying()">
              <div class="wave-bar bar-1"></div>
              <div class="wave-bar bar-2"></div>
              <div class="wave-bar bar-3"></div>
              <div class="wave-bar bar-4"></div>
              <div class="wave-bar bar-5"></div>
              <div class="wave-bar bar-6"></div>
              <div class="wave-bar bar-7"></div>
              <div class="wave-bar bar-8"></div>
            </div>

            <div class="player-controls">
              <span class="time">0:{{ isPlaying() ? '24' : '00' }}</span>
              <button class="play-btn" (click)="togglePlay()">
                <i [class]="isPlaying() ? 'fas fa-pause' : 'fas fa-play'"></i>
              </button>
              <span class="time">3:45</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .oracle-container {
      padding-top: 40px;
      padding-bottom: 80px;
    }

    .oracle-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 50px;
    }

    .oracle-hero-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .hero-title {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      line-height: 1.7;
    }

    .oracle-bullets {
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-top: 15px;
    }

    .bullet-item {
      display: flex;
      gap: 15px;
      align-items: flex-start;
    }

    .bullet-icon {
      font-size: 1.3rem;
      color: var(--color-gold);
      background: rgba(212, 175, 55, 0.1);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(212, 175, 55, 0.2);
    }

    .bullet-item h4 {
      font-family: var(--font-sans);
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .bullet-item p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Visual and Player Column */
    .oracle-visual-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      position: relative;
    }

    .mascot-wrapper {
      position: relative;
      width: 100%;
      max-width: 320px;
      display: flex;
      justify-content: center;
    }

    .mascot-img {
      max-width: 100%;
      height: auto;
      border-radius: 50%;
      box-shadow: 0 10px 30px rgba(92, 36, 179, 0.3);
      border: 2px solid rgba(212, 175, 55, 0.3);
      z-index: 2;
    }

    .oracle-glow {
      position: absolute;
      width: 90%;
      height: 90%;
      background: radial-gradient(circle, rgba(92, 36, 179, 0.3) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      filter: blur(25px);
    }

    /* Audio Player Mockup */
    .audio-player-card {
      width: 100%;
      max-width: 350px;
      padding: 24px;
      text-align: center;
      position: relative;
      z-index: 3;
    }

    .player-top {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }

    .pulse-indicator {
      width: 8px;
      height: 8px;
      background: var(--text-muted);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .pulse-indicator.playing {
      background: #2ecc71;
      box-shadow: 0 0 10px #2ecc71;
      animation: pulse-green 1.5s infinite;
    }

    @keyframes pulse-green {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }

    .track-title {
      font-size: 1.3rem;
      margin-bottom: 2px;
    }

    .track-artist {
      font-size: 0.85rem;
      color: var(--color-purple-light);
      margin-bottom: 18px;
    }

    .language-selector {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
    }

    .lang-btn {
      padding: 5px 12px;
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 0.8rem;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.02);
      transition: all 0.3s ease;
    }

    .lang-btn.active {
      background: rgba(212, 175, 55, 0.15);
      border-color: var(--color-gold);
      color: var(--color-gold-hover);
    }

    /* Wave animations */
    .audio-waves {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      height: 40px;
      margin-bottom: 20px;
    }

    .wave-bar {
      width: 4px;
      background-color: var(--color-purple-light);
      border-radius: 2px;
      height: 6px;
      transition: height 0.3s ease;
    }

    .audio-waves.active .wave-bar {
      animation: wave-bounce 1.2s ease-in-out infinite alternate;
      background-color: var(--color-gold);
    }

    .bar-1 { animation-delay: 0.1s !important; }
    .bar-2 { animation-delay: 0.3s !important; }
    .bar-3 { animation-delay: 0.5s !important; }
    .bar-4 { animation-delay: 0.2s !important; }
    .bar-5 { animation-delay: 0.4s !important; }
    .bar-6 { animation-delay: 0.6s !important; }
    .bar-7 { animation-delay: 0.1s !important; }
    .bar-8 { animation-delay: 0.3s !important; }

    @keyframes wave-bounce {
      0% { height: 6px; }
      100% { height: 35px; }
    }

    .player-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    .time {
      font-size: 0.8rem;
      color: var(--text-muted);
      width: 35px;
    }

    .play-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--color-gold);
      color: #0d061f;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 4px 15px var(--color-gold-glow);
      transition: all 0.3s ease;
    }

    .play-btn:hover {
      transform: scale(1.08);
      background: var(--color-gold-hover);
    }

    @media (max-width: 992px) {
      .oracle-hero {
        grid-template-columns: 1fr;
        gap: 50px;
      }
      .oracle-visual-container {
        order: -1;
      }
    }
  `]
})
export class OracleComponent {
  readonly t = (key: string) => this.translation.t(key);
  isPlaying = signal(false);
  selectedLanguage = signal('English');

  constructor(public readonly translation: TranslationService) {}

  togglePlay() {
    this.isPlaying.update(val => !val);
  }

  setLanguage(lang: string) {
    this.selectedLanguage.set(lang);
  }
}
