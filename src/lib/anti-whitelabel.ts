// Anti-Whitelabeling Protection System
// Prevents unauthorized copying and hosting of the platform
import { SUPPORT_EMAIL } from '@/config/contact';

interface DomainConfig {
  allowedDomains: string[];
  brandName: string;
  copyrightNotice: string;
  licenseKey?: string;
}

const AUTHORIZED_CONFIG: DomainConfig = {
  allowedDomains: [
    'localhost',
    '127.0.0.1',
    'lovable.app',
    'lovableproject.com',
    'forward-focus-elevation.org',
    'www.forward-focus-elevation.org',
    'mdwkkgancoocvkmecwkm.supabase.co'
  ],
  brandName: 'Forward Focus Elevation',
  copyrightNotice: '© 2025 Forward Focus Elevation. All rights reserved.',
  licenseKey: 'FFE-2025-AUTHORIZED'
};

class AntiWhitelabelProtection {
  private isAuthorized = false;
  private domainChecked = false;
  
  constructor() {
    this.init();
  }

  private init() {
    // Immediate domain validation
    this.validateDomain();
    
    // Continuous monitoring
    setInterval(() => this.validateDomain(), 30000); // Check every 30 seconds
    
    // Check for tampering attempts
    this.monitorTampering();
    
    // Add copyright watermarks - DISABLED
    // this.addCopyrightProtection();
  }

  private validateDomain(): boolean {
    const currentDomain = window.location.hostname;
    const isDevelopment = currentDomain === 'localhost' || currentDomain.includes('127.0.0.1');
    const isAuthorizedDomain = AUTHORIZED_CONFIG.allowedDomains.some(domain => 
      currentDomain.includes(domain) || currentDomain.endsWith(domain)
    );
    
    this.isAuthorized = isDevelopment || isAuthorizedDomain;
    this.domainChecked = true;
    
    if (!this.isAuthorized) {
      this.handleUnauthorizedUsage();
      return false;
    }
    
    return true;
  }

  private handleUnauthorizedUsage() {
    console.warn('Unauthorized domain detected:', window.location.hostname);
    
    // Create overlay warning
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      padding: 2rem;
    `;
    
    overlay.innerHTML = `
      <h1>Unauthorized Usage Detected</h1>
      <p>This platform is protected by copyright and licensing agreements.</p>
      <p>Domain: <strong>${window.location.hostname}</strong> is not authorized.</p>
      <p>${AUTHORIZED_CONFIG.copyrightNotice}</p>
      <p>For licensing inquiries, contact: ${SUPPORT_EMAIL}</p>
    `;
    
    document.body.appendChild(overlay);
    
    // Disable functionality
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 5000);
  }

  private monitorTampering() {
    // Monitor for attempts to modify the protection system
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    
    console.log = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes('anti-whitelabel'))) {
        this.handleTamperingAttempt('Console tampering detected');
      }
      originalConsoleLog.apply(console, args);
    };
    
    console.warn = (...args) => {
      originalConsoleWarn.apply(console, args);
    };
    
    // Monitor for DOM manipulation attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
          mutation.removedNodes.forEach((node) => {
            if (node instanceof Element && node.className?.includes('copyright-protection')) {
              this.handleTamperingAttempt('Copyright removal detected');
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }

  private handleTamperingAttempt(reason: string) {
    console.warn('Tampering attempt detected:', reason);
    
    // Log to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_violation', {
        violation_type: 'tampering_attempt',
        reason: reason,
        domain: window.location.hostname
      });
    }
  }

  private addCopyrightProtection() {
    // Add invisible copyright markers throughout the page
    const createCopyrightMarker = () => {
      const marker = document.createElement('div');
      marker.className = 'copyright-protection';
      marker.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        user-select: none;
      `;
      marker.setAttribute('data-copyright', AUTHORIZED_CONFIG.copyrightNotice);
      marker.setAttribute('data-license', AUTHORIZED_CONFIG.licenseKey || '');
      return marker;
    };
    
    // Add markers to key elements
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createCopyrightMarker());
      
      // Add to header and footer if they exist
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      
      if (header) header.appendChild(createCopyrightMarker());
      if (footer) footer.appendChild(createCopyrightMarker());
    });
  }

  public isAuthenticatedDomain(): boolean {
    return this.domainChecked && this.isAuthorized;
  }

  public getBrandInfo() {
    return {
      name: AUTHORIZED_CONFIG.brandName,
      copyright: AUTHORIZED_CONFIG.copyrightNotice,
      authorized: this.isAuthorized
    };
  }
}

// Initialize protection system immediately
const antiWhitelabelProtection = new AntiWhitelabelProtection();

export { antiWhitelabelProtection, AntiWhitelabelProtection };