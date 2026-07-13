import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="support-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">{{ t('support.sectionSubtitle') }}</span>
        <h1 class="section-title">{{ t('support.sectionTitle') }}</h1>
        <p class="section-desc">{{ t('support.sectionDescription') }}</p>
      </div>

      <div class="support-grid">
        <!-- Contact Form -->
        <div class="form-card glass-panel">
          <h3>{{ t('support.formHeading') }}</h3>
          <form (submit)="sendMessage($event)">
            <div class="form-group">
              <label for="name">{{ t('support.nameLabel') }}</label>
              <input type="text" id="name" name="name" [(ngModel)]="contactForm.name" required class="input-field" placeholder="{{ t('support.namePlaceholder') }}" />
            </div>

            <div class="form-group">
              <label for="email">{{ t('support.emailLabel') }}</label>
              <input type="email" id="email" name="email" [(ngModel)]="contactForm.email" required class="input-field" placeholder="{{ t('support.emailPlaceholder') }}" />
            </div>

            <div class="form-group">
              <label for="message">{{ t('support.messageLabel') }}</label>
              <textarea id="message" name="message" [(ngModel)]="contactForm.message" required rows="5" class="input-field textarea-field" placeholder="{{ t('support.messagePlaceholder') }}"></textarea>
            </div>

            <button type="submit" class="btn-gold form-submit-btn">
              {{ t('support.submitButton') }} <i class="fas fa-paper-plane"></i>
            </button>
            
            <p *ngIf="submitStatus()" class="submit-success-msg">
              <i class="fas fa-check-circle"></i> {{ t('support.submitSuccess') }}
            </p>
          </form>
        </div>

        <!-- Details Column -->
        <div class="details-column">
          <div class="contact-methods glass-panel">
            <h3>{{ t('support.directContactHeading') }}</h3>
            
            <div class="contact-item">
              <div class="contact-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <h4>{{ t('support.supportEmailHeading') }}</h4>
                <p><a href="mailto:support@numeroshastra.com" class="text-gold">support&#64;numeroshastra.com</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon"><i class="fas fa-shield-alt"></i></div>
              <div>
                <h4>{{ t('support.legalHeading') }}</h4>
                <p class="legal-links">
                  <a href="#" (click)="$event.preventDefault()" class="text-gold">{{ t('support.privacyPolicy') }}</a>
                  <span class="divider">|</span>
                  <a href="#" (click)="$event.preventDefault()" class="text-gold">{{ t('support.termsOfService') }}</a>
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Accordion -->
          <div class="faq-container glass-panel">
            <h3>{{ t('support.faqHeading') }}</h3>
            
            <div *ngFor="let item of faqs() ; let idx = index" class="faq-item" [class.open]="openFaq() === idx">
              <div class="faq-question" (click)="toggleFaq(idx)">
                <span>{{ item.question }}</span>
                <i class="fas" [class.fa-chevron-down]="openFaq() !== idx" [class.fa-chevron-up]="openFaq() === idx"></i>
              </div>
              <div class="faq-answer">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .support-container {
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

    .support-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: flex-start;
    }

    .form-card {
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .form-card h3, .contact-methods h3, .faq-container h3 {
      font-size: 1.5rem;
      color: var(--text-main);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 15px;
      margin-bottom: 10px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .form-group label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-main);
    }

    .input-field {
      background: rgba(10, 4, 22, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-main);
      padding: 12px 18px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-family: var(--font-sans);
      outline: none;
      transition: all 0.3s ease;
    }

    .input-field:focus {
      border-color: var(--color-gold);
      box-shadow: 0 0 10px var(--color-gold-glow);
    }

    .textarea-field {
      resize: vertical;
    }

    .form-submit-btn {
      width: 100%;
      justify-content: center;
      margin-top: 10px;
    }

    .submit-success-msg {
      color: #2ecc71;
      font-size: 0.95rem;
      margin-top: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }

    /* Direct Contact & FAQs */
    .details-column {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .contact-methods {
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .contact-item {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .contact-icon {
      font-size: 1.2rem;
      color: var(--color-gold);
      background: rgba(212, 175, 55, 0.1);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(212, 175, 55, 0.2);
    }

    .contact-item h4 {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .contact-item p {
      font-size: 1.05rem;
      font-weight: 500;
    }

    .legal-links {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .divider {
      color: rgba(255,255,255,0.2);
    }

    /* FAQ accordion */
    .faq-container {
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .faq-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 15px;
    }

    .faq-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
      color: var(--text-main);
      padding: 5px 0;
      transition: color 0.3s ease;
    }

    .faq-question:hover {
      color: var(--color-gold-hover);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, margin-top 0.3s ease;
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }

    .faq-item.open .faq-answer {
      max-height: 150px;
      margin-top: 10px;
    }

    @media (max-width: 992px) {
      .support-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  `]
})
export class SupportComponent {
  readonly t = (key: string) => this.translation.t(key);
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitStatus = signal(false);
  openFaq = signal<number | null>(0); // Default open first FAQ
  readonly faqs = computed(() => this.translation.locale().support.faqs);

  constructor(public readonly translation: TranslationService) {}

  toggleFaq(idx: number) {
    if (this.openFaq() === idx) {
      this.openFaq.set(null);
    } else {
      this.openFaq.set(idx);
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) return;

    // Simulate API request
    this.submitStatus.set(true);
    setTimeout(() => {
      this.submitStatus.set(false);
      this.contactForm = { name: '', email: '', message: '' };
    }, 4000);
  }
}
