import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pillars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pillars-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">Deep Insights</span>
        <h1 class="section-title">The 12 Core Pillars of <span class="text-gold">Destiny</span></h1>
        <p class="section-desc">
          Our advanced birthdate analysis covers 12 crucial facets of your life, blending traditional wisdom with scientific accuracy. Here is what is mapped out in your detailed report.
        </p>
      </div>

      <div class="pillars-grid">
        <div *ngFor="let pillar of pillars; let i = index" class="pillar-card glass-panel">
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
          <h2 class="text-gold">Ready to explore your personal blueprint?</h2>
          <p>Get instant access to your 12 pillars report inside the mobile app today.</p>
        </div>
        <div class="footer-cta-action">
          <a href="https://play.google.com/store/apps/details?id=com.numeroshastra.client&referrer=utm_source%3Dwebsite%26utm_campaign%3Dlaunch_2026%26utm_medium%3Dinstall_button" target="_blank" class="btn-gold">
            <i class="fab fa-google-play"></i> Get Started For Free
          </a>
          <a href="https://app.numeroshastra.com/" target="_blank" rel="noopener noreferrer" class="btn-outline">
            <i class="fas fa-globe"></i> Web App
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
  pillars = [
    {
      title: 'Detailed Lo Shu Grid Analysis',
      icon: 'fas fa-th',
      description: 'An ancient tool used to understand your destiny, potential, and life patterns through the placement and alignment of numbers.'
    },
    {
      title: 'Career Insights',
      icon: 'fas fa-briefcase',
      description: 'Discover the most suitable professional paths and business sectors that align with your natural vibrations and birth numbers.'
    },
    {
      title: 'Personalized Remedies',
      icon: 'fas fa-gem',
      description: 'Simple, practical, and highly effective remedies (like crystals, metal bracelets, and color therapy) to balance missing numbers in your grid.'
    },
    {
      title: 'Advanced Personality Mapping',
      icon: 'fas fa-user-circle',
      description: 'Deep analytical insights into your character traits, behavior, hidden strengths, and your ruling/destiny planets.'
    },
    {
      title: 'Life Path & Pinnacle Phase Guidance',
      icon: 'fas fa-road',
      description: 'Understand the major developmental cycles of your life, what challenges to prepare for, and your ultimate purpose.'
    },
    {
      title: 'Oracle Voice Guide',
      icon: 'fas fa-headphones-alt',
      description: 'Don\'t just read your destiny—listen to it. High-quality audio narrations bring your reports to life with ease.'
    },
    {
      title: 'Stock Market & Financial Nature',
      icon: 'fas fa-chart-line',
      description: 'A unique numerological perspective on your financial risk tolerance, investment temperament, and money accumulation patterns.'
    },
    {
      title: 'Number Occurrence Insights',
      icon: 'fas fa-sync-alt',
      description: 'Learn how repeated numbers or double occurrences in your birthdate influence your energy levels, traits, and behavioral patterns.'
    },
    {
      title: 'Horizontal, Vertical & Diagonal Planes',
      icon: 'fas fa-compress-arrows-alt',
      description: 'A complete breakdown of your Thought Plane, Will Plane, Action Plane, Success Plane, and how energy flows between them.'
    },
    {
      title: 'Personalized Lucky Colors & Days',
      icon: 'fas fa-palette',
      description: 'Optimize your routine, business meetings, and key life decisions by aligning with your personal lucky vibrations.'
    },
    {
      title: 'Personality & Life Path Synergy',
      icon: 'fas fa-project-diagram',
      description: 'See how your core Driver and Conductor numbers interact to form your unique life dynamic and compatibility matrices.'
    },
    {
      title: 'Energy Boosters',
      icon: 'fas fa-bolt',
      description: 'Practical daily routines, affirmations, and meditation tips to enhance your vibrational frequency and positive aura.'
    }
  ];
}
