
import React, { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

const Analytics: React.FC = () => {
  const { getSetting, getBooleanSetting, isLoading } = useSettings();

  useEffect(() => {
    if (isLoading) return;

    const analyticsEnabled = getBooleanSetting('analytics_enabled', false);
    console.log('Analytics enabled:', analyticsEnabled);
    
    if (!analyticsEnabled) {
      console.log('Analytics disabled in settings');
      return;
    }

    const googleAnalyticsId = getSetting('google_analytics_id', '');
    const googleTagManagerId = getSetting('google_tag_manager_id', '');
    const metaPixelId = getSetting('meta_pixel_id', '');

    // Google Analytics 4
    if (googleAnalyticsId && googleAnalyticsId.startsWith('G-')) {
      console.log('Loading Google Analytics:', googleAnalyticsId);
      
      // Remove existing GA scripts to avoid duplicates
      const existingGAScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
      existingGAScripts.forEach(script => script.remove());

      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      script1.onload = () => console.log('Google Analytics script loaded');
      script1.onerror = () => console.error('Failed to load Google Analytics script');
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
        console.log('Google Analytics configured with ID: ${googleAnalyticsId}');
      `;
      document.head.appendChild(script2);
    }

    // Google Tag Manager
    if (googleTagManagerId && googleTagManagerId.startsWith('GTM-')) {
      console.log('Loading Google Tag Manager:', googleTagManagerId);
      
      // Remove existing GTM scripts
      const existingGTMScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
      existingGTMScripts.forEach(script => script.remove());

      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManagerId}');
        console.log('Google Tag Manager loaded with ID: ${googleTagManagerId}');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(noscript);
    }

    // Meta Pixel
    if (metaPixelId && metaPixelId.length > 10) {
      console.log('Loading Meta Pixel:', metaPixelId);
      
      // Remove existing Meta Pixel scripts
      const existingFBScripts = document.querySelectorAll('script[src*="facebook.net/en_US/fbevents.js"]');
      existingFBScripts.forEach(script => script.remove());

      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');
        console.log('Meta Pixel loaded with ID: ${metaPixelId}');
      `;
      document.head.appendChild(script);
    }
  }, [getSetting, getBooleanSetting, isLoading]);

  return null;
};

export default Analytics;
