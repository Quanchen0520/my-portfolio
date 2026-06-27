// English locale content — kept in sync with zh.ts via the Dict type.
import type { Dict } from './zh';

const en: Dict = {
  nav: { home: 'Home', story: 'Story', products: 'Collections', blog: 'Journal', contact: 'Contact' },
  common: {
    explore: 'Explore',
    talk: 'Say hello',
    readMore: 'Read more',
    viewAll: 'View all',
    backToList: 'Back to journal',
    next: 'Next',
    prev: 'Prev',
    nextPage: 'Next',
    page: 'Page',
    send: 'Send message',
    minRead: 'min read',
  },
  home: {
    heroEyebrow: 'Lifestyle of Green',
    heroTitle: ['Let plants', 'become how you breathe'],
    heroLead:
      'Botanica begins with a single plant, bringing the rhythm of nature back into everyday life. We believe that caring for plants is caring for yourself.',
    statTitle: 'Living in sync with nature',
    stats: [
      { n: '2018', l: 'Founded' },
      { n: '40+', l: 'Curated items' },
      { n: '12k', l: 'Plant lovers' },
      { n: '100%', l: 'Kind packaging' },
    ],
    storyEyebrow: 'Our story',
    storyTitle: 'We believe slowing down brings you closer to life',
    storyLead:
      'It started with one green pot on a city balcony. Botanica wants every busy soul to have a corner where they can simply breathe.',
    productEyebrow: 'Collections',
    productTitle: 'Seasonal picks',
    productLead: 'Plants and living objects chosen by the rhythm of the seasons, to make your days a little warmer.',
    journalEyebrow: 'Journal',
    journalTitle: 'The Botanica Journal',
    journalLead: 'Notes on plant care, styling, and the slow life.',
  },
  story: {
    eyebrow: 'Brand story',
    title: 'From one green pot to a way of living',
    lead: 'Botanica is not about making you an expert gardener. It is an invitation to feel time, and yourself, anew while caring for a plant.',
    sections: [
      {
        h: 'The beginning',
        p: 'In 2018, our founder kept her first Monstera alive on a tiny rented balcony. Watching the leaves slowly unfurl, she realised that caring for a life could steady her own.',
      },
      {
        h: 'Our belief',
        p: 'We do not chase rare species for show. We believe an easy-to-keep, long-lasting plant is the real relationship between people and greenery. Every item is tested in a real home.',
      },
      {
        h: 'Sustainability',
        p: 'From reusable ceramic pots to 100% recyclable packaging, we try to make every purchase a little kinder to the planet.',
      },
    ],
    valuesTitle: 'Three commitments',
    values: [
      { h: 'Easy to keep', p: 'We favour hardy, beginner-friendly plants.' },
      { h: 'Locally sourced', p: 'We work with local ceramicists and growers.' },
      { h: 'Earth friendly', p: 'Less plastic, more reuse.' },
    ],
  },
  products: {
    eyebrow: 'Collections',
    title: 'Our collections',
    lead: 'Organised by season and setting, from plants to objects, find the green that fits your life.',
  },
  blog: {
    eyebrow: 'Journal',
    title: 'The Botanica Journal',
    lead: 'Writing on plant care, spatial inspiration and the slow life.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Leave a note, let us talk',
    lead: 'Whether it is a collaboration, a wholesale enquiry, or simply a chat about plants, we would love to hear from you.',
    form: {
      name: 'Name',
      email: 'Email',
      topic: 'Topic',
      topics: ['General enquiry', 'Wholesale', 'Styling', 'Press'],
      message: 'Message',
      placeholderMsg: 'Tell us anything…',
      send: 'Send message',
      successTitle: 'Message sent',
      successBody: 'Thank you for writing in. We will get back to you soon.',
      again: 'Write another',
      note: '*This is a demo form; submitting only shows a success message on the front end.',
    },
    infoTitle: 'Other ways to reach us',
  },
  footer: {
    tagline: 'Let plants become how you breathe.',
    sitemap: 'Sitemap',
    contact: 'Contact',
    newsletter: 'Newsletter',
    newsletterNote: 'One letter a month on plant care and living inspiration.',
    subscribe: 'Subscribe',
    rights: 'A brand site + CMS demo example.',
  },
};

export default en;
