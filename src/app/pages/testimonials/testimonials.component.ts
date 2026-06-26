import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonials-container container">
      <div class="section-header text-center">
        <span class="section-subtitle">User Stories</span>
        <h1 class="section-title">Real Stories. Real <span class="text-gold">Insights.</span></h1>
        <p class="section-desc">
          Join thousands of users who have found clarity, alignment, and direction with Numero Shastra.
        </p>
      </div>

      <div class="testimonials-grid">
        <div *ngFor="let t of testimonials" class="testimonial-card glass-panel">
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
          <h2>Transform Your Life Journey</h2>
          <p>Join our growing community and download Numero Shastra on your mobile device today.</p>
          <div class="store-buttons">
            <a href="https://play.google.com" target="_blank" class="btn-gold">
              <i class="fab fa-google-play"></i> Get It on Google Play
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
    }
  `]
})
export class TestimonialsComponent {
  testimonials = [
    {
      quote: "The remedies for my missing numbers were so easy to follow and actually made a difference in my focus.",
      author: "Omkar Sutar",
      role: "Verified App User"
    },
    {
      quote: "The Oracle voice feels very personal. It's like a meditation and analysis combined.",
      author: "Priya Sharma",
      role: "Spiritual Practitioner"
    },
    {
      quote: "I finally understand why certain years were so challenging thanks to the Pinnacle analysis.",
      author: "Amit Verma",
      role: "Entrepreneur"
    }
  ];
}
