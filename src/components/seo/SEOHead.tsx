import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG, getSiteUrl, getImageUrl } from '@/config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

export const SEOHead = ({ 
  title, 
  description, 
  path, 
  image = '/logo-new.png',
  type = 'website' 
}: SEOHeadProps) => {
  const url = getSiteUrl(path);
  const siteName = SITE_CONFIG.name;
  const fullTitle = `${title} | ${siteName}`;
  const imageUrl = getImageUrl(image);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};