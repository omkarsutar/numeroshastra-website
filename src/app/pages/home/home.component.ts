import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <span class="badge">Vedic & Chinese Numerology</span>
          <h1 class="hero-title">Unlock the Mystical Patterns of Your Life</h1>
          <p class="hero-subtitle">
            Discover your true purpose, hidden strengths, and future path with the power of ancient Numerology and the Lo Shu Grid.
          </p>
          <div class="hero-actions">
            <a href="https://play.google.com" target="_blank" class="btn-gold pulsing-border">
              <i class="fab fa-google-play"></i> Download App
            </a>
            <a routerLink="/detailed-analysis" class="btn-outline">
              Explore 12 Pillars
            </a>
          </div>
        </div>
        <div class="hero-image-container floating">
          <img src="/numero_shastra_hero_1778239627649.png" alt="Numero Shastra Destiny Analysis" class="hero-img" />
          <div class="hero-glow"></div>
        </div>
      </section>

      <!-- Lo Shu Grid Interactive Section -->
      <section class="grid-feature-section container">
        <div class="section-header text-center">
          <span class="section-subtitle">Sacred Geometry</span>
          <h2 class="section-title">The Magic of the <span class="text-gold">Lo Shu Grid</span></h2>
          <p class="section-desc">Click on any cell of the magic square below to discover the aspect of life it governs.</p>
        </div>

        <div class="grid-showcase">
          <div class="lo-shu-grid-visualizer">
            <div 
              *ngFor="let cell of gridCells" 
              class="grid-cell" 
              [class.active]="selectedCell().number === cell.number"
              (click)="selectCell(cell)">
              <span class="cell-num">{{ cell.number }}</span>
              <span class="cell-label">{{ cell.title }}</span>
            </div>
          </div>

          <div class="cell-details-card glass-panel">
            <div class="details-header">
              <div class="details-icon">
                <i [class]="selectedCell().icon"></i>
              </div>
              <div>
                <h3 class="text-gold">{{ selectedCell().title }} (Number {{ selectedCell().number }})</h3>
                <span class="planet-name">Ruling Planet: {{ selectedCell().planet }}</span>
              </div>
            </div>
            <p class="details-body">{{ selectedCell().description }}</p>
            <div class="details-plane">
              <strong>Governs:</strong> {{ selectedCell().governs }}
            </div>
          </div>
        </div>
      </section>

      <!-- Introduction Section -->
      <section class="intro-section container glass-panel">
        <div class="intro-grid">
          <div class="intro-text">
            <span class="badge">About the Companion</span>
            <h2>More Than Just Numbers</h2>
            <p>
              Numero Shastra is your personal spiritual companion. Using time-tested Vedic and Lo Shu Grid principles, we provide a deep, 360-degree analysis of your birthdate to guide your career, finances, and personality growth.
            </p>
            <p>
              Whether you are missing key numbers in your grid or want to align with your personal lucky vibrations, we offer personalized remedies and guidance to empower your path.
            </p>
          </div>
          <div class="intro-highlight-stats">
            <div class="stat-card">
              <span class="stat-number">360°</span>
              <span class="stat-label">Birthdate Analysis</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">3+</span>
              <span class="stat-label">Languages Supported</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Highlights -->
      <section class="highlights-section container">
        <div class="section-header text-center">
          <span class="section-subtitle">Core Strengths</span>
          <h2 class="section-title">Why Choose <span class="text-gold">Numero Shastra</span></h2>
        </div>

        <div class="highlights-grid">
          <div class="highlight-card glass-panel">
            <div class="highlight-icon">
              <i class="fas fa-scroll"></i>
            </div>
            <h3>Ancient Wisdom</h3>
            <p>Based on the sacred Lo Shu Grid and profound Numerology principles refined over centuries.</p>
          </div>

          <div class="highlight-card glass-panel">
            <div class="highlight-icon">
              <i class="fas fa-volume-up"></i>
            </div>
            <h3>Oracle Voice</h3>
            <p>Listen to your destiny. Receive an immersive experience with our voice narration system.</p>
          </div>

          <div class="highlight-card glass-panel">
            <div class="highlight-icon">
              <i class="fas fa-language"></i>
            </div>
            <h3>Multilingual</h3>
            <p>Full support for English, Marathi, and Hindi, bringing the insights to your preferred language.</p>
          </div>

          <div class="highlight-card glass-panel">
            <div class="highlight-icon">
              <i class="fas fa-brain"></i>
            </div>
            <h3>Data-Driven</h3>
            <p>Advanced calculation algorithms for high-precision personality and strength mapping.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      padding-bottom: 60px;
    }

    /* Hero Section */
    .hero-section {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 40px;
      min-height: calc(100vh - 120px);
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 40px 24px;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .badge {
      align-self: flex-start;
      background: rgba(92, 36, 179, 0.25);
      border: 1px solid rgba(163, 112, 247, 0.4);
      color: var(--color-purple-light);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.8rem);
      line-height: 1.15;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 40%, var(--color-gold) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-muted);
      max-width: 580px;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 15px;
    }

    .hero-image-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-img {
      max-width: 100%;
      height: auto;
      border-radius: 24px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      z-index: 2;
    }

    .hero-glow {
      position: absolute;
      width: 80%;
      height: 80%;
      background: radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      filter: blur(40px);
    }

    /* Lo Shu Grid visualizer */
    .grid-feature-section {
      margin-top: 80px;
      margin-bottom: 80px;
    }

    .section-header {
      margin-bottom: 40px;
    }

    .section-subtitle {
      color: var(--color-gold);
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 2px;
      font-weight: 700;
    }

    .section-title {
      font-size: 2.2rem;
      margin-top: 5px;
      margin-bottom: 15px;
    }

    .section-desc {
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    .grid-showcase {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      margin-top: 30px;
    }

    .lo-shu-grid-visualizer {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      aspect-ratio: 1;
      background: rgba(26, 15, 48, 0.4);
      padding: 15px;
      border-radius: 20px;
      border: 2px solid rgba(92, 36, 179, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }

    .grid-cell {
      background: linear-gradient(135deg, rgba(22, 12, 42, 0.9) 0%, rgba(35, 18, 68, 0.9) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .grid-cell:hover, .grid-cell.active {
      transform: scale(1.05);
      border-color: var(--color-gold);
      box-shadow: 0 0 20px var(--color-gold-glow);
    }

    .grid-cell.active {
      background: linear-gradient(135deg, rgba(92, 36, 179, 0.5) 0%, rgba(22, 12, 42, 0.9) 100%);
    }

    .cell-num {
      font-size: 2.5rem;
      font-family: var(--font-serif);
      font-weight: 700;
      color: var(--color-gold);
    }

    .cell-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }

    .cell-details-card {
      padding: 35px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
    }

    .details-header {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .details-icon {
      font-size: 2rem;
      color: var(--color-gold);
      background: rgba(212, 175, 55, 0.1);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(212, 175, 55, 0.3);
    }

    .planet-name {
      font-size: 0.9rem;
      color: var(--color-purple-light);
    }

    .details-body {
      color: var(--text-muted);
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .details-plane {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 15px;
      font-size: 0.95rem;
    }

    /* Intro Section */
    .intro-section {
      padding: 50px;
      margin-top: 80px;
      margin-bottom: 80px;
    }

    .intro-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 50px;
      align-items: center;
    }

    .intro-text h2 {
      font-size: 2.2rem;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .intro-text p {
      color: var(--text-muted);
      margin-bottom: 20px;
      font-size: 1.05rem;
    }

    .intro-highlight-stats {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .stat-card {
      background: rgba(10, 4, 22, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 25px;
      border-radius: 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-shadow: inset 0 0 20px rgba(92, 36, 179, 0.08);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-gold);
      font-family: var(--font-serif);
    }

    .stat-label {
      color: var(--text-main);
      font-weight: 500;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 1px;
    }

    /* Highlights */
    .highlights-section {
      margin-top: 80px;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .highlight-card {
      padding: 35px 25px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .highlight-icon {
      font-size: 2rem;
      color: var(--color-gold);
      background: linear-gradient(135deg, rgba(92, 36, 179, 0.2) 0%, rgba(26, 15, 48, 0.4) 100%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(92, 36, 179, 0.4);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .highlight-card h3 {
      font-size: 1.3rem;
      color: var(--text-main);
    }

    .highlight-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Responsive */
    @media (max-width: 992px) {
      .hero-section {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 50px;
        padding-top: 20px;
      }
      .badge {
        align-self: center;
      }
      .hero-content {
        align-items: center;
      }
      .hero-subtitle {
        margin: 0 auto;
      }
      .hero-image-container {
        order: -1;
        max-width: 480px;
        margin: 0 auto;
      }
      .grid-showcase {
        grid-template-columns: 1fr;
      }
      .intro-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .intro-highlight-stats {
        flex-direction: row;
      }
      .stat-card {
        flex: 1;
      }
    }

    @media (max-width: 576px) {
      .intro-section {
        padding: 30px 20px;
      }
      .intro-highlight-stats {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent {
  gridCells = [
    { number: 4, title: 'Wealth & Prosperity', planet: 'Rahu (North Node)', icon: 'fas fa-coins', description: 'Governs financial growth, material wealth, organization, and practicality. It resides in the top-left quadrant of the Lo Shu Grid representing your financial capacity.', governs: 'Wealth, Assets, Practicality, discipline.' },
    { number: 9, title: 'Fame & Reputation', planet: 'Mars', icon: 'fas fa-fire', description: 'Governs social recognition, reputation, energy, passion, and career expansion. Positioned at the top center, it represents the element of Fire.', governs: 'Fame, Passion, Ambition, recognition.' },
    { number: 2, title: 'Love & Relationships', planet: 'Moon', icon: 'fas fa-heart', description: 'Governs partnership, marriage, relationship harmony, emotional balance, and sensitivity. Positioned in the top-right, representing Earth element.', governs: 'Love, Diplomacy, Relationships, intuition.' },
    { number: 3, title: 'Family & Health', planet: 'Jupiter', icon: 'fas fa-tree', description: 'Governs ancestral support, health, relationships with parents, growth, and community. Positioned on the left representing Wood element.', governs: 'Growth, Health, Family relationships, expansion.' },
    { number: 5, title: 'Stability & Balance', planet: 'Mercury', icon: 'fas fa-anchor', description: 'The center core. Governs mental balance, stability, communication, resilience, and general luck. It connects all other numbers.', governs: 'Core stability, Balance, Business acumen, communication.' },
    { number: 7, title: 'Creativity & Children', planet: 'Ketu (South Node)', icon: 'fas fa-paint-brush', description: 'Governs creative ideas, children, legacy, introspection, and spiritual pursuits. Positioned on the right representing Metal element.', governs: 'Creative expression, Children, Intuition, analytical skills.' },
    { number: 8, title: 'Knowledge & Wisdom', planet: 'Saturn', icon: 'fas fa-book-open', description: 'Governs spiritual insights, learning, intellect, memory, and personal growth. Positioned in the bottom-left representing Earth element.', governs: 'Education, Wisdom, Self-reflection, patience.' },
    { number: 1, title: 'Career & Journey', planet: 'Sun', icon: 'fas fa-briefcase', description: 'Governs career opportunities, life journey, independence, ambition, and willpower. Positioned at the bottom center representing Water element.', governs: 'Career, Aspirations, Independence, planning.' },
    { number: 6, title: 'Helpful Friends', planet: 'Venus', icon: 'fas fa-hands-helping', description: 'Governs mentorship, support from friends, travel opportunities, luxury, and aesthetics. Positioned in the bottom-right representing Metal element.', governs: 'Mentors, Support network, Travel, wealth comforts.' }
  ];

  selectedCell = signal(this.gridCells[4]); // Default to center 5

  selectCell(cell: any) {
    this.selectedCell.set(cell);
  }
}
