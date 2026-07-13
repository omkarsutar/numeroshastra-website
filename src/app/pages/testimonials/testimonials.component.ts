import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonials-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">{{ t('testimonials.sectionSubtitle') }}</span>
        <h1 class="section-title">{{ t('testimonials.sectionTitle') }}</h1>
        <p class="section-desc">{{ t('testimonials.sectionDescription') }}</p>
      </div>

      <div class="testimonials-grid">
        <div *ngFor="let t of testimonials()" class="testimonial-card glass-panel">
          <div class="stars">
            <i *ngFor="let star of [1,2,3,4,5]" class="fas fa-star text-gold"></i>
          </div>
          <p class="quote">"{{ t.quote }}"</p>
          <div class="user-info">
            <div class="avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div>
              <span class="name">{{ t.author }}</span>
              <span class="role">{{ t.role }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- App download banner -->
      <section class="cta-banner glass-panel">
        <div class="cta-content">
          <h2>{{ t('testimonials.ctaHeading') }}</h2>
          <p>{{ t('testimonials.ctaText') }}</p>
          <div class="store-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.numeroshastra.client&referrer=utm_source%3Dwebsite%26utm_campaign%3Dlaunch_2026%26utm_medium%3Dinstall_button" target="_blank" class="btn-gold">
              <i class="fab fa-google-play"></i> {{ translation.t('app.buttons.getStartedForFree') }}
            </a>
            <a href="https://app.numeroshastra.com/" target="_blank" rel="noopener noreferrer" class="btn-outline">
              <i class="fas fa-globe"></i> {{ translation.t('app.buttons.webApp') }}
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .testimonials-container {
      padding-top: 40px;
      padding-bottom: 80px;
    }

    .section-header {
      margin-bottom: 50px;
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
      max-width: 600px;
      margin: 0 auto;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 80px;
    }

    .testimonial-card {
      padding: 35px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      min-height: 250px;
    }

    .stars {
      display: flex;
      gap: 4px;
      font-size: 0.95rem;
    }

    .quote {
      color: var(--text-main);
      font-size: 1.1rem;
      font-style: italic;
      line-height: 1.6;
      position: relative;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .avatar {
      font-size: 2.2rem;
      color: var(--color-purple-light);
    }

    .name {
      display: block;
      font-weight: 700;
      color: var(--text-main);
      font-size: 1rem;
    }

    .role {
      display: block;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    /* CTA Banner */
    .cta-banner {
      padding: 60px 40px;
      text-align: center;
      background: linear-gradient(135deg, rgba(22, 12, 42, 0.8) 0%, rgba(92, 36, 179, 0.2) 100%);
      border: 1px solid rgba(92, 36, 179, 0.3);
    }

    .cta-content h2 {
      font-size: 2.2rem;
      margin-bottom: 12px;
    }

    .cta-content p {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .store-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
  `]
})
export class TestimonialsComponent {
  readonly t = (key: string) => this.translation.t(key);
  readonly testimonials = computed(() => this.translation.locale().testimonials.testimonials);

  constructor(public readonly translation: TranslationService) {}
}
