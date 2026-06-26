/**
 * Universal Multi-Brand Smart Routing & Tracking SDK
 * Dynamically handles device detection, cross-platform routing, and parameter injection.
 */
export class UniversalAppRouter {
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
            redirectDelay: options.redirectDelay !== undefined ? options.redirectDelay : 400,
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
            if (platform.includes("ios") || platform.includes("macos")) return "ios";
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

        const referrerPairs = [];
        for (const [k, v] of Object.entries(extractedParams)) {
            referrerPairs.push(`${k}=${v}`);
        }
        const referrerQueryString = referrerPairs.join('&');
        return `${base}&referrer=${encodeURIComponent(referrerQueryString)}`;
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
            // Safe string fallback concatenation if a raw relative path string is provided
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
                targetUrl = `https://apple.com{this.config.ios.appStoreId}`;
            } else {
                targetUrl = this._appendParamsToUrl(this.config.fallbackUrl, params);
            }
        } else {
            targetUrl = this._appendParamsToUrl(this.config.fallbackUrl, params);
        }

        // Fire Meta Pixel tracking call if script initialization exists on the window object
        // Pure, native JavaScript syntax
        if (this.config.pixelId && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
                brand_name: this.config.brandName,
                device_detected: device,
                campaign: params.utm_campaign || 'untracked'
            });
        }


        // Forward the client browser
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.location.href = targetUrl;
            }
        }, this.config.redirectDelay);
    }
}
