// Offline fallback data for when network is unavailable
export const offlineResources = [
  {
    id: 'offline-1',
    name: 'Emergency Contacts',
    description: 'Critical emergency numbers and contacts',
    category: 'Emergency',
    address: 'Local Emergency Services',
    website: 'Call 911 for emergencies',
    phone: '911',
    contact: 'Emergency Services'
  },
  {
    id: 'offline-2', 
    name: 'Crisis Support',
    description: 'Mental health crisis support resources',
    category: 'Mental Health',
    address: 'National Crisis Line',
    website: 'Available 24/7',
    phone: '988',
    contact: 'Crisis Line'
  },
  {
    id: 'offline-3',
    name: 'Legal Aid',
    description: 'Basic legal assistance information',
    category: 'Legal',
    address: 'Contact local legal aid society',
    website: 'Search locally when online',
    phone: 'Contact when online',
    contact: 'Local Legal Aid'
  }
];

export const offlineStates = [
  {
    id: 'ohio',
    name: 'Ohio',
    abbreviation: 'OH',
    status: 'active'
  }
];

export const offlineExternalLinks = {
  base: 'Offline Mode',
  learning: {
    mindfulness: 'Available when online',
    financial: 'Available when online', 
    business: 'Available when online',
    community: 'Available when online'
  },
  support: {
    volunteer: 'Available when online',
    partnership: 'Available when online'
  }
};