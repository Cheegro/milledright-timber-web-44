
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '@/hooks/useSettings';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) => {
  const { getSetting, isLoading } = useSettings();
  const location = useLocation();

  // Default fallback values
  const defaultTitle = 'MilledRight Sawmill - Quality Lumber & Custom Milling Services';
  const defaultDescription = 'Premium lumber, live edge slabs, and custom milling services in Whitchurch-Stouffville, ON. Quality wood products direct from our sawmill.';
  const defaultKeywords = 'sawmill, lumber, live edge slabs, custom milling, wood products, Whitchurch-Stouffville, Ontario';

  // Get settings values with fallbacks
  const siteTitle = getSetting('site_meta_title', defaultTitle);
  const siteDescription = getSetting('site_meta_description', defaultDescription);
  const siteKeywords = getSetting('site_keywords', defaultKeywords);
  const companyName = getSetting('company_name', 'MilledRight Sawmill');

  // Build dynamic page title
  let pageTitle = title ? `${title} | ${companyName}` : siteTitle;
  
  // Add location-based context for SEO
  if (location.pathname !== '/') {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const pageType = pathSegments[0];
    
    if (pageType === 'products' && !title) {
      pageTitle = `Premium Lumber Products | ${companyName}`;
    } else if (pageType === 'contact' && !title) {
      pageTitle = `Contact Us | ${companyName}`;
    } else if (pageType === 'about' && !title) {
      pageTitle = `About Our Sawmill | ${companyName}`;
    } else if (pageType === 'blog' && !title) {
      pageTitle = `Workshop Journal & News | ${companyName}`;
    }
  }

  const pageDescription = description || siteDescription;
  const pageKeywords = keywords || siteKeywords;
  const currentUrl = url || `${window.location.origin}${location.pathname}`;
  const defaultImage = 'https://lh3.googleusercontent.com/pw/AP1GczPTRLiCj-uABM3l1danyqwliakkiNlE1J2GunUYMhSQox9oWd_6xgYZ50AcIO39LB_tiSChg-kOvEOeg1Wd7qhXvShvHpCxdQLvYCJt7SOrzNZ7=w2400';

  // Don't render until settings are loaded to avoid flashing incorrect meta tags
  if (isLoading) {
    return null;
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={companyName} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={companyName} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Local Business Schema for homepage */}
      {location.pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": companyName,
            "description": pageDescription,
            "url": currentUrl,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": getSetting('business_address', '16720 Hwy 48'),
              "addressLocality": "Whitchurch-Stouffville",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "telephone": getSetting('business_phone', ''),
            "email": getSetting('business_email', ''),
            "image": defaultImage,
            "priceRange": "$$",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "44.2312",
                "longitude": "-79.4493"
              },
              "geoRadius": "50000"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
