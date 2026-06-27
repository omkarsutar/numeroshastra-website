/**
 * Universal Multi-Brand Smart Routing & Tracking SDK
 * Dynamically handles device detection, cross-platform routing, and parameter injection.
 */
class UniversalAppRouter {
    /**
     * Initializes structural routes and configuration details for a brand profile.
     * @param {Object} options - Configuration parameters for the specific application.
     */
    constructor(options) {
        this.config = {
            brandName: options.brandName || "Default Brand",
            android: {
                packageId: options.android?.packageId || "",
                customUrl: options.android?.customUrl || null
            },
            ios: {
                appStoreId: options.ios?.appStoreId || null,
                pwaUrl: options.ios?.pwaUrl || null
            },
            fallbackUrl: options.fallbackUrl || "https://google.com",
            pixelId: options.pixelId || null,
            redirectDelay: options.redirectDelay !== undefined ? options.redirectDelay : 1000,
            paramMapping: options.paramMapping || {
                utm_source: 'utm_source',
                utm_campaign: 'utm_campaign',
                utm_medium: 'utm_medium'
            }
        };
    }

    /**
     * Reads modern user-agent metrics or browser platform string indicators
     * @returns {string} 'android' | 'ios' | 'desktop'
     */
    _getDeviceOS() {
        if (navigator.userAgentData && navigator.userAgentData.platform) {
            const platform = navigator.userAgentData.platform.toLowerCase();
            if (platform.includes("android")) return "android";
            if (platform.includes("ios") || platform.includes("iphone") || platform.includes("ipad")) return "ios";
            if (platform.includes("windows") || platform.includes("macos") || platform.includes("linux")) return "desktop";
        }
        const userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
        if (/android/i.test(userAgent)) return "android";
        if (/ipad|iphone|ipod/i.test(userAgent)) return "ios";
        return "desktop";
    }

    /**
     * Loops through tracking parameters and maps keys based on configuration preferences
     */
    _extractParameters(currentQueryParams) {
        const processedParams = {};
        for (const [inboundKey, outboundKey] of Object.entries(this.config.paramMapping)) {
            const val = currentQueryParams[inboundKey];
            if (val) {
                processedParams[outboundKey] = val;
            }
        }
        return processedParams;
    }

    /**
     * Combines key parameters to match Google Play Install Referrer API parameters
     */
    _buildAndroidUrl(extractedParams) {
        if (this.config.android.customUrl) {
            return this._appendParamsToUrl(this.config.android.customUrl, extractedParams);
        }
        const base = `https://play.google.com/store/apps/details?id=${this.config.android.packageId}`;
        if (Object.keys(extractedParams).length === 0) return base;

        const referrerParams = new URLSearchParams();
        for (const [k, v] of Object.entries(extractedParams)) {
            referrerParams.append(k, v);
        }
        return `${base}&referrer=${encodeURIComponent(referrerParams.toString())}`;
    }

    /**
     * Appends parsed tracking properties to a clean destination link string
     */
    _appendParamsToUrl(baseUrl, params) {
        if (Object.keys(params).length === 0) return baseUrl;
        try {
            const url = new URL(baseUrl);
            for (const [k, v] of Object.entries(params)) {
                url.searchParams.set(k, v);
            }
            return url.toString();
        } catch (e) {
            const separator = baseUrl.includes('?') ? '&' : '?';
            const queryArray = Object.entries(params).map(([k, v]) => `${k}=${v}`);
            return `${baseUrl}${separator}${queryArray.join('&')}`;
        }
    }

    /**
     * Registers tracking pixel event metrics and executes the browser page frame redirect
     */
    executeRouting(rawInboundParams) {
        const params = this._extractParameters(rawInboundParams);
        const device = this._getDeviceOS();
        let targetUrl = "";

        if (device === "android") {
            targetUrl = this._buildAndroidUrl(params);
        } else if (device === "ios") {
            if (this.config.ios.pwaUrl) {
                targetUrl = this._appendParamsToUrl(this.config.ios.pwaUrl, params);
            } else if (this.config.ios.appStoreId) {
                targetUrl = `https://apps.apple.com/app/id${this.config.ios.appStoreId}`;
            } else {
                targetUrl = this._appendParamsToUrl(this.config.fallbackUrl, params);
            }
        } else {
            targetUrl = this._appendParamsToUrl(this.config.fallbackUrl, params);
        }

        const performRedirect = () => {
            if (typeof window !== 'undefined') {
                window.location.href = targetUrl;
            }
        };

        // Enforce clean official tracking pipeline integration 
        if (this.config.pixelId && typeof window !== 'undefined') {
            const pixelId = this.config.pixelId;
            const brandName = encodeURIComponent(this.config.brandName);
            const deviceDetected = encodeURIComponent(device);
            const campaign = encodeURIComponent(params.utm_campaign || 'untracked');
            const ts = Date.now();
            const trUrl = `https://www.facebook.com/tr?id=${pixelId}&ev=ViewContent&cd[brand_name]=${brandName}&cd[device_detected]=${deviceDetected}&cd[campaign]=${campaign}&noscript=1&ts=${ts}`;

            // Fix SPA Race: Force load official fbq execution queue if missing on this path route
            if (!window.fbq) {
                window.fbq = function () {
                    (window.fbq.q = window.fbq.q || []).push(arguments);
                };
                window._fbq = window._fbq || window.fbq;
                window.fbq.loaded = true;
                window.fbq.version = '2.0';
                window.fbq.queue = [];

                const scriptElement = document.createElement('script');
                scriptElement.async = true;
                scriptElement.src = 'https://connect.facebook.net/en_US/fbevents.js';
                document.head.appendChild(scriptElement);
            }

            // Always call init to link this route instance to your explicit target asset ID
            window.fbq('init', this.config.pixelId);

            // Execute standard tracking call
            try {
                window.fbq('track', 'ViewContent', {
                    brand_name: this.config.brandName,
                    device_detected: device,
                    campaign: params.utm_campaign || 'untracked'
                });
            } catch (e) {
                console.error("Meta Pixel core SDK exception tracker log:", e);
            }

            // 2. Dispatch direct network beacon and only redirect once complete (or safety timeout reached)
            let redirected = false;
            let safetyTimeout = null;

            const done = () => {
                if (!redirected) {
                    redirected = true;
                    if (safetyTimeout) {
                        clearTimeout(safetyTimeout);
                    }
                    performRedirect();
                }
            };

            // Safety fallback timeout to ensure user redirects even if request hangs or is blocked
            safetyTimeout = setTimeout(done, this.config.redirectDelay || 1000);

            if (typeof fetch === 'function') {
                fetch(trUrl, { method: 'GET', mode: 'no-cors', keepalive: true })
                    .then(done)
                    .catch(done);
            } else {
                const img = new Image();
                img.onload = done;
                img.onerror = done;
                img.src = trUrl;
            }
        } else {
            // No tracking needed, redirect immediately
            performRedirect();
        }
    }
}

// Global window exposure for universal accessibility on non-module frameworks (PHP, HTML, WordPress)
if (typeof window !== 'undefined') {
    window.UniversalAppRouter = UniversalAppRouter;
}

// Named export mapping for module bundlers (Angular, React, Vite)
export { UniversalAppRouter };
