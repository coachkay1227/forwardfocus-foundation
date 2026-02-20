import { StructuredData } from './StructuredData';
import { SITE_CONFIG } from '@/config/site';

export const GlobalStructuredData = () => {
  const baseUrl = SITE_CONFIG.baseUrl;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: SITE_CONFIG.name,
        url: baseUrl,
        logo: `${baseUrl}${SITE_CONFIG.logo.default}`,
        sameAs: SITE_CONFIG.social.sameAs,
        dateModified: new Date().toISOString(),
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person-coach-kay`,
        name: 'Coach Kay',
        jobTitle: 'Founder & AI Transformation Coach',
        knowsAbout: [
          'AI literacy',
          'Reentry support',
          'Victim services',
          'Community transformation',
        ],
        url: `${baseUrl}/about`,
        sameAs: SITE_CONFIG.social.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE_CONFIG.name,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.hero-headline'],
        },
      },
    ],
  };

  return <StructuredData data={data} />;
};
