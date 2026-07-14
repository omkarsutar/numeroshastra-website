import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-pillars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pillars-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">{{ t('pillars.heading') }}</span>
        <h1 class="section-title">{{ t('pillars.heading') }}</h1>
        <p class="section-desc">{{ t('pillars.description') }}</p>
      </div>

      <div class="pillars-grid">
        <div *ngFor="let pillar of pillars(); let i = index" class="pillar-card glass-panel">
          <div class="pillar-num">{{ i + 1 | number:'2.0-0' }}</div>
          <div class="pillar-icon">
            <i [class]="pillar.icon"></i>
          </div>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-description">{{ pillar.description }}</p>
        </div>
      </div>

      <div class="pillars-footer glass-panel">
        <div class="footer-cta-content">
          <h2 class="text-gold">{{ t('pillars.ctaHeading') }}</h2>
          <p>{{ t('pillars.ctaText') }}</p>
        </div>
        <div class="footer-cta-action">
          <a href="https://play.google.com/store/apps/details?id=com.numeroshastra.client&referrer=utm_source=website&utm_campaign=launch_2026&utm_medium=install_button" target="_blank" class="btn-gold">
            <i class="fab fa-google-play"></i> {{ translation.t('app.buttons.getStartedForFree') }}
          </a>
          <a href="https://app.numeroshastra.com/" target="_blank" rel="noopener noreferrer" class="btn-outline">
            <i class="fas fa-globe"></i> {{ translation.t('app.buttons.webApp') }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pillars-container {
      padding-top: 40px;
      padding-bottom: 80px;
    }

    .section-header {
      margin-bottom: 60px;
    }

    .section-subtitle {
      color: var(--color-gold);
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 2px;
      font-weight: 700;
    }

    .section-title {
      font-size: clamp(2.2rem, 4vw, 3rem);
      margin-top: 5px;
      margin-bottom: 15px;
    }

    .section-desc {
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto;
      font-size: 1.1rem;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .pillar-card {
      padding: 35px 25px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 15px;
      min-height: 250px;
    }

    .pillar-num {
      position: absolute;
      top: 15px;
      right: 25px;
      font-size: 2.2rem;
      font-weight: 900;
      opacity: 0.08;
      font-family: var(--font-serif);
      color: var(--color-gold);
      transition: all 0.3s ease;
    }

    .pillar-card:hover .pillar-num {
      opacity: 0.25;
      transform: scale(1.1);
    }

    .pillar-icon {
      font-size: 2rem;
      color: var(--color-gold);
      background: rgba(92, 36, 179, 0.15);
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(92, 36, 179, 0.3);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .pillar-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
      margin-top: 5px;
    }

    .pillar-description {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* Pillars Footer CTA */
    .pillars-footer {
      margin-top: 80px;
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      background: linear-gradient(135deg, rgba(22, 12, 42, 0.8) 0%, rgba(92, 36, 179, 0.2) 100%);
      border: 1px solid rgba(92, 36, 179, 0.3);
    }

    .footer-cta-content h2 {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }

    .footer-cta-content p {
      color: var(--text-muted);
      font-size: 1.05rem;
    }

    .footer-cta-action {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .pillars-footer {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
      }
    }
  `]
})
export class PillarsComponent {
  readonly t = (key: string) => this.translation.t(key);
  readonly pillars = computed(() => this.translation.locale().pillars.pillarItems);

  constructor(public readonly translation: TranslationService) { }
}
