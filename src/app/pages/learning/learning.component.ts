import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="learning-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">{{ t('learning.sectionBadge') }}</span>
        <h1 class="section-title">{{ t('learning.sectionTitle') }}</h1>
        <p class="section-desc">{{ t('learning.sectionDesc') }}</p>
      </div>

      <div class="learning-sections-grid">
        <!-- Section 1: Life Path Number -->
        <div class="learning-section-card glass-panel">
          <div class="card-icon"><i class="fas fa-compass"></i></div>
          <h2>{{ t('learning.lifePathTitle') }}</h2>
          <p>{{ t('learning.lifePathParagraph1') }}</p>
          <p>{{ t('learning.lifePathParagraph2') }}</p>
        </div>

        <!-- Section 2: Lo Shu Grid -->
        <div class="learning-section-card glass-panel">
          <div class="card-icon"><i class="fas fa-border-all"></i></div>
          <h2>Understanding the Lo Shu Grid</h2>
          <p>
            The Lo Shu Grid is a 3x3 magic square used in Chinese Numerology. Each cell represents a different aspect of life (e.g., Wealth, Family, Knowledge, Career).
          </p>
          <p>
            By placing your birthdate numbers in this grid, we reveal which areas of your life are naturally strong and which need balancing. The missing numbers represent your life lessons, and their remedies are key to unlocking your full potential.
          </p>
        </div>
      </div>

      <!-- Interactive Calculator Section -->
      <section class="calculator-section glass-panel">
        <div class="calculator-header text-center">
          <h2 class="text-gold">Life Path Calculator</h2>
          <p>Calculate your core Life Path Number instantly. Enter your birthdate below.</p>
        </div>

        <div class="calculator-body">
          <div class="input-group">
            <label for="birthdate">Date of Birth</label>
            <input 
              type="date" 
              id="birthdate" 
              [(ngModel)]="birthdate" 
              class="birth-input" 
              max="2100-12-31" />
            <button (click)="calculateLifePath()" class="btn-gold">
              Calculate Path <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <!-- Result Display -->
          <div *ngIf="calculationResult()" class="result-display">
            <div class="result-number-circle">
              <span class="result-num">{{ calculationResult()?.number }}</span>
              <span class="result-lbl">Life Path</span>
            </div>
            <div class="result-text">
              <h3>The Path of the "{{ calculationResult()?.archetype }}"</h3>
              <p>{{ calculationResult()?.description }}</p>
              <div class="traits-tags">
                <span *ngFor="let trait of calculationResult()?.traits" class="trait-tag">
                  {{ trait }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .learning-container {
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

    .learning-sections-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 60px;
    }

    .learning-section-card {
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .card-icon {
      font-size: 2.2rem;
      color: var(--color-gold);
      margin-bottom: 5px;
    }

    .learning-section-card h2 {
      font-size: 1.6rem;
      line-height: 1.3;
    }

    .learning-section-card p {
      color: var(--text-muted);
      font-size: 1.02rem;
      line-height: 1.7;
    }

    /* Calculator Section */
    .calculator-section {
      padding: 50px;
      max-width: 800px;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(22, 12, 42, 0.9) 0%, rgba(92, 36, 179, 0.15) 100%);
      border: 1px solid rgba(92, 36, 179, 0.3);
    }

    .calculator-header {
      margin-bottom: 30px;
    }

    .calculator-body {
      display: flex;
      flex-direction: column;
      gap: 40px;
      align-items: center;
    }

    .input-group {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .input-group label {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .birth-input {
      background: rgba(10, 4, 22, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 25px;
      font-size: 1rem;
      font-family: var(--font-sans);
      outline: none;
      transition: all 0.3s ease;
    }

    .birth-input:focus {
      border-color: var(--color-gold);
      box-shadow: 0 0 10px var(--color-gold-glow);
    }

    /* Results */
    .result-display {
      display: flex;
      align-items: center;
      gap: 30px;
      width: 100%;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .result-number-circle {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-gold) 0%, #b8901a 100%);
      color: #0d061f;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    }

    .result-num {
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--font-serif);
      line-height: 1;
    }

    .result-lbl {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .result-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .result-text h3 {
      font-size: 1.4rem;
      color: var(--color-gold);
    }

    .result-text p {
      color: var(--text-muted);
      font-size: 0.98rem;
    }

    .traits-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 5px;
    }

    .trait-tag {
      background: rgba(92, 36, 179, 0.25);
      border: 1px solid rgba(163, 112, 247, 0.3);
      color: var(--color-purple-light);
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .learning-sections-grid {
        grid-template-columns: 1fr;
      }
      .result-display {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class LearningComponent {
  readonly t = (key: string) => this.translation.t(key);
  birthdate: string = '';
  calculationResult = signal<any>(null);
  readonly lifePathDatabase = computed(() => this.translation.locale().learning.lifePathDatabase);

  constructor(public readonly translation: TranslationService) {}

  calculateLifePath() {
    if (!this.birthdate) return;

    const dateParts = this.birthdate.split('-'); // YYYY-MM-DD
    if (dateParts.length !== 3) return;

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const sumDigits = (val: string): number => {
      return val.split('').reduce((acc, char) => acc + parseInt(char, 10), 0);
    };

    const ySum = sumDigits(year);
    const mSum = sumDigits(month);
    const dSum = sumDigits(day);

    let total = ySum + mSum + dSum;

    const reduceNum = (num: number): number => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((acc, char) => acc + parseInt(char, 10), 0);
      }
      return num;
    };

    const finalNum = reduceNum(total);

    const result = this.lifePathDatabase()[finalNum] || {
      archetype: 'The Mystic Seeker',
      description: 'Your life path is highly unique and holds custom destiny patterns.',
      traits: ['Unique', 'Mystical', 'Individualistic']
    };

    this.calculationResult.set({
      number: finalNum,
      archetype: result.archetype,
      description: result.description,
      traits: result.traits
    });
  }
}
