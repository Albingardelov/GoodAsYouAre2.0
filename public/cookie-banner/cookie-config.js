// Silktide Cookie Banner Configuration
// This file configures the cookie banner with Swedish and English support

(function() {
  // Get current language from localStorage or default to Swedish
  function getCurrentLanguage() {
    const saved = localStorage.getItem('language');
    return saved === 'en' ? 'en' : 'sv';
  }

  // Get translations based on language
  function getTranslations(lang) {
    if (lang === 'en') {
      return {
        banner: {
          description: '<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href="/privacy-policy" target="_blank">Cookie Policy.</a></p>',
          acceptAllButtonText: 'Accept all',
          acceptAllButtonAccessibleLabel: 'Accept all cookies',
          rejectNonEssentialButtonText: 'Reject non-essential',
          rejectNonEssentialButtonAccessibleLabel: 'Reject non-essential cookies',
          preferencesButtonText: 'Preferences',
          preferencesButtonAccessibleLabel: 'Toggle cookie preferences'
        },
        preferences: {
          title: 'Customize your cookie preferences',
          description: '<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>',
          creditLinkText: 'Get this banner for free',
          creditLinkAccessibleLabel: 'Get this banner for free'
        },
        necessary: {
          name: 'Necessary',
          description: '<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>'
        },
        functional: {
          name: 'Functional',
          description: '<p>Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.</p>'
        },
        analytics: {
          name: 'Analytics',
          description: '<p>Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as number of visitors, bounce rate, traffic source, etc.</p>'
        },
        advertisement: {
          name: 'Advertisement',
          description: '<p>Advertisement cookies are used to provide visitors with customised advertisements based on the pages you visited previously and to analyse the effectiveness of the ad campaigns.</p>'
        }
      };
    } else {
      // Swedish translations
      return {
        banner: {
          description: '<p>Vi använder cookies på vår webbplats för att förbättra din användarupplevelse, tillhandahålla personligt innehåll och analysera vår trafik. <a href="/privacy-policy" target="_blank">Cookie Policy.</a></p>',
          acceptAllButtonText: 'Acceptera alla',
          acceptAllButtonAccessibleLabel: 'Acceptera alla cookies',
          rejectNonEssentialButtonText: 'Avvisa icke-nödvändiga',
          rejectNonEssentialButtonAccessibleLabel: 'Avvisa icke-nödvändiga cookies',
          preferencesButtonText: 'Inställningar',
          preferencesButtonAccessibleLabel: 'Växla cookie-inställningar'
        },
        preferences: {
          title: 'Anpassa dina cookie-inställningar',
          description: '<p>Vi respekterar din rätt till integritet. Du kan välja att inte tillåta vissa typer av cookies. Dina cookie-inställningar gäller på hela vår webbplats.</p>',
          creditLinkText: 'Få denna banner gratis',
          creditLinkAccessibleLabel: 'Få denna banner gratis'
        },
        necessary: {
          name: 'Nödvändiga',
          description: '<p>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt och kan inte stängas av. De hjälper till med saker som inloggning och inställning av dina integritetsinställningar.</p>'
        },
        functional: {
          name: 'Funktionella',
          description: '<p>Funktionella cookies hjälper till att utföra vissa funktioner som att dela webbplatsens innehåll på sociala medieplattformar, samla in feedback och andra tredjepartsfunktioner.</p>'
        },
        analytics: {
          name: 'Analytiska',
          description: '<p>Analytiska cookies används för att förstå hur besökare interagerar med webbplatsen. Dessa cookies hjälper till att ge information om mätvärden som antal besökare, studsfrekvens, trafikkälla, etc.</p>'
        },
        advertisement: {
          name: 'Marknadsföring',
          description: '<p>Marknadsföringscookies används för att ge besökare anpassade annonser baserat på de sidor du tidigare besökt och för att analysera effektiviteten av annonskampanjer.</p>'
        }
      };
    }
  }

  // Initialize cookie banner when Silktide is ready
  function initCookieBanner() {
    if (typeof silktideCookieBannerManager === 'undefined') {
      // Silktide not loaded yet, try again in 100ms
      setTimeout(initCookieBanner, 100);
      return;
    }

    const lang = getCurrentLanguage();
    const translations = getTranslations(lang);

    silktideCookieBannerManager.updateCookieBannerConfig({
      background: {
        showBackground: true
      },
      cookieIcon: {
        position: 'bottomRight'
      },
      cookieTypes: [
        {
          id: 'necessary',
          name: translations.necessary.name,
          description: translations.necessary.description,
          required: true,
          onAccept: function() {
            // Necessary cookies are always accepted
            // Language preference is stored in localStorage (already handled)
            console.log('Necessary cookies accepted');
          }
        },
        {
          id: 'functional',
          name: translations.functional.name,
          description: translations.functional.description,
          required: false,
          onAccept: function() {
            // Functional cookies accepted
            // EmailJS doesn't require cookies, but we can track consent here
            console.log('Functional cookies accepted');
            // Add any functional cookie logic here if needed
          },
          onReject: function() {
            // Functional cookies rejected
            console.log('Functional cookies rejected');
          }
        },
        {
          id: 'analytics',
          name: translations.analytics.name,
          description: translations.analytics.description,
          required: false,
          onAccept: function() {
            // Analytics cookies accepted
            // Future: Initialize Google Analytics here if added
            console.log('Analytics cookies accepted');
            // Example: if (typeof gtag !== 'undefined') { gtag('consent', 'update', { analytics_storage: 'granted' }); }
          },
          onReject: function() {
            // Analytics cookies rejected
            console.log('Analytics cookies rejected');
            // Example: if (typeof gtag !== 'undefined') { gtag('consent', 'update', { analytics_storage: 'denied' }); }
          }
        },
        {
          id: 'advertisement',
          name: translations.advertisement.name,
          description: translations.advertisement.description,
          required: false,
          onAccept: function() {
            // Advertisement cookies accepted
            // Future: Initialize Facebook Pixel, Google Ads here if added
            console.log('Advertisement cookies accepted');
            // Example: if (typeof gtag !== 'undefined') { gtag('consent', 'update', { ad_storage: 'granted' }); }
          },
          onReject: function() {
            // Advertisement cookies rejected
            console.log('Advertisement cookies rejected');
            // Example: if (typeof gtag !== 'undefined') { gtag('consent', 'update', { ad_storage: 'denied' }); }
          }
        }
      ],
      text: {
        banner: translations.banner,
        preferences: translations.preferences
      },
      position: {
        banner: 'bottomRight'
      }
    });
  }

  // Listen for language changes to update cookie banner
  window.addEventListener('storage', function(e) {
    if (e.key === 'language') {
      // Language changed, reinitialize cookie banner
      initCookieBanner();
    }
  });

  // Also listen for custom languageChanged event
  window.addEventListener('languageChanged', function(e) {
    // Language changed, reinitialize cookie banner
    initCookieBanner();
  });

  // Wait for React to be ready before initializing cookie banner
  function waitForReact() {
    // Check if React has rendered (root element has children)
    const root = document.getElementById('root');
    if (root && root.children.length > 0) {
      // React is ready, initialize cookie banner
      setTimeout(initCookieBanner, 500); // Small delay to ensure React is fully initialized
      return;
    }
    
    // React not ready yet, try again in 100ms
    setTimeout(waitForReact, 100);
  }

  // Start waiting for React when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForReact);
  } else {
    waitForReact();
  }
})();

