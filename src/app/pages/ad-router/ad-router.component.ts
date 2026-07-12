import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ad-router',
  template: `
    <div style="text-align:center; font-family:sans-serif; margin-top:20%;">
      <h2>Opening Numero Shastra...</h2>
    </div>
  `,
  standalone: true
})
export class AdRouterComponent implements OnInit {
  private readonly trackUrl = 'https://toogplqvzycbngfzsutb.supabase.co/functions/v1/track-web-visit';

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(async (rawParams) => {
        try {
          this.trackLandingVisit();

          // Point directly to the root public deployment directory asset folder path
          const pathString = '/js/universal-router-sdk.js';
          const module = await import(/* @import-ignore */ pathString);

          const routerInstance = new module.UniversalAppRouter({
            brandName: "Numero Shastra",
            pixelId: "1944589032861359",
            android: {
              packageId: "com.numeroshastra.client"
            },
            ios: {
              pwaUrl: "https://app.numeroshastra.com"
            },
            fallbackUrl: "https://numeroshastra.com"
          });

          routerInstance.executeRouting(rawParams);
        } catch (error: any) {
          this.showVisualCrash(error);
        }
      });
    }
  }

  private showVisualCrash(error: any): void {
    console.error("Redirection routing fallback trace:", error);
    const errorBanner = document.createElement('div');
    errorBanner.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:25px;z-index:99999;font-family:monospace;word-break:break-all;';
    errorBanner.innerHTML = `<h4>Routing Crash Log:</h4><p>${error?.message || error}</p>`;
    document.body.appendChild(errorBanner);

    // Kept commented out for direct live visual verification on your phone
    // window.location.href = "https://numeroshastra.com";
  }

  private trackLandingVisit(): void {
    const payload = JSON.stringify({
      referrer_raw: window.location.href
    });

    fetch(this.trackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
      mode: 'cors',
      credentials: 'omit',
      keepalive: true
    }).catch(error => {
      console.error('Tracker encountered network layout fault:', error);
    });
  }
}







// Configuration Example for Other Future BrandsIf you deploy an completely different framework type later (like a pure HTML snippet page or a landing app for another brand name entirely), simply load the tracking SDK script file and initialize the module parameters dynamically:

/* <!-- For a different brand using a native iOS App Store deployment instead of a PWA -->
<script src="https://numeroshastra.com"></script>
<script>
    const secondBrandRouter = new UniversalAppRouter({
        brandName: "Apex Astrology",
        pixelId: "APEX_ASTRO_PIXEL_ID",
        android: {
            packageId: "com.apexastrology.horoscope"
        },
        ios: {
            appStoreId: "987654321" // Routes iPhone users to Apple App Store automatically
        },
        fallbackUrl: "https://apexastrology.com",
        
        // If this specific ad set uses unique query tags, re-map them seamlessly:
        paramMapping: {
            partner_id: 'utm_source',
            promo_name: 'utm_campaign',
            ad_type: 'utm_medium'
        }
    });

    // Run traffic processing
    const currentUrlParams = Object.fromEntries(new URLSearchParams(window.location.search));
    secondBrandRouter.executeRouting(currentUrlParams);
</script> */


/* @Component({
  selector: 'app-ad-router',
  template: `
    <div class="ad-router-container">
      <div class="loader-content">
        <div class="spinner"></div>
        <h2>Opening Numero Shastra...</h2>
        <p>Connecting you to your destiny guide</p>
      </div>
      <div class="glow-bg"></div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .ad-router-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      color: var(--text-main);
      position: relative;
      text-align: center;
      font-family: var(--font-sans);
    }
    
    .loader-content {
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
    
    h2 {
      font-family: var(--font-serif);
      color: var(--color-gold);
      font-size: 1.8rem;
    }
    
    p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      border-top-color: var(--color-gold);
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .glow-bg {
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%);
      filter: blur(40px);
      z-index: 1;
    }
  `]
})
export class AdRouterComponent implements OnInit {
  // Replace this with your actual Play Store package name/bundle ID
  private readonly appPackageName = 'com.numeroshastra.app'; 

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Ensure this script executes only in the user's browser (not during server pre-rendering)
    if (isPlatformBrowser(this.platformId)) {
      
      // 1. Extract the UTM parameters from the Meta ad click
      this.route.queryParams.subscribe(params => {
        const source = params['utm_source'] || 'meta';
        const campaign = params['utm_campaign'] || 'ad_campaign';
        const medium = params['utm_medium'] || 'social';

        // 2. Identify the user's Operating System
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        let targetDestination = '';

        if (/android/i.test(userAgent)) {
          // Construct the Android Play Store Link with Google Referrer formatting
          const rawReferrer = `utm_source=${source}&utm_campaign=${campaign}&utm_medium=${medium}`;
          targetDestination = `https://play.google.com/store/apps/details?id=${this.appPackageName}&referrer=${encodeURIComponent(rawReferrer)}`;
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
          // Construct iOS redirection (Direct to Landing Page or App Store if you have one)
          targetDestination = `https://numeroshastra.com/home?utm_source=${source}&utm_campaign=${campaign}&utm_medium=${medium}`;
        } else {
          // Desktop/Fallback destination
          targetDestination = `https://numeroshastra.com/home?utm_source=${source}&utm_campaign=${campaign}&utm_medium=${medium}`;
        }

        // 3. Fire the Meta Pixel event if it is initialized on the page
        if ((window as any).fbq) {
          try {
            (window as any).fbq('track', 'ViewContent', { 
              brand_name: 'Numero Shastra',
              device_detected: /android/i.test(userAgent) ? 'android' : /iPad|iPhone|iPod/.test(userAgent) ? 'ios' : 'desktop',
              campaign: campaign 
            });
          } catch (e) {
            console.error('Meta Pixel error:', e);
          }
        }

        // 4. Redirect the browser immediately after a tiny 400ms tracking delay
        setTimeout(() => {
          window.location.href = targetDestination;
        }, 400);
      });
    }
  }
} */
