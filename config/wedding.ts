export const wedding = {
  siteUrl: 'https://joeyandana2026.com',
  couple: {
    firstPartner: 'Joey Rahme',
    secondPartner: 'Ana Maria Lahoud',
    displayNames: 'Joey Rahme & Ana Maria Lahoud',
    shortNames: 'Joey & Ana',
    monogram: 'J & A',
  },
  date: {
    iso: '2026-08-08T18:00:00+03:00',
    display: 'August 8, 2026',
    numeric: '08.08.2026',
  },
  tagline: 'When 8·8·8 Found Us',
  subtitle: 'Infinite Love',
  copy: {
    invitation:
      'Together with our families, we invite you to celebrate the beginning of our forever.',
    story:
      'When 8·8·8 found us, two paths became one.',
    destination:
      'Join us in Batroun, Lebanon, for an evening of love, celebration, and memories that will last forever.',
  },
  details: {
    ceremony: {
      title: 'Ceremony',
      venue: 'Mar Estephan Church',
      location: 'Batroun, Lebanon',
      time: '6:00 PM',
      note: 'Please arrive early to be seated before the ceremony begins.',
      // Replace this Google Maps link with the final church location link.
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mar+Estephan+Church+Batroun+Lebanon',
    },
    reception: {
      title: 'Reception',
      venue: 'Domaine des Oliviers',
      location: 'Batroun, Lebanon',
      time: '8:00 PM',
      note: 'Dinner, dancing, and an evening celebration will follow.',
      // Replace this Google Maps link with the final reception location link.
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Domaine+des+Oliviers+Batroun+Lebanon',
    },
    dressCode: 'Formal evening attire',
    adultsOnly:
      'An adults-only celebration, except where special arrangements have been approved.',
  },
  // Replace or expand this wedding schedule as details are finalized.
  schedule: [
    { time: '5:30 PM', label: 'Guest arrival' },
    { time: '6:00 PM', label: 'Wedding ceremony' },
    { time: '8:00 PM', label: 'Reception begins' },
    { time: '9:00 PM', label: 'Dinner and celebration' },
  ],
  rsvpUrl:
    'https://www.theknot.com/us/joey-rahme-and-ana-lahoud-2026-08-08-031a1a93-0c54-4512-bdb7-e4d9dcf0a9d0/rsvp',
  // Replace this with your final travel and accommodation page or document.
  travelUrl: 'https://example.com/travel',
  // Replace this music file with a licensed or original final track.
  musicFileUrl: '/audio/wedding-song.mp3',
  images: {
    // Replace with the couple photo once available.
    coupleHero: '/images/photos/joey-ana-05.jpg',
    // Replace with a Batroun or venue photo once available.
    venue: '/images/photos/joey-ana-04.jpg',
    // Replace with an exported 1200x630 social sharing image.
    socialPreview: '/images/photos/joey-ana-01.jpg',
    // Replace or reorder these photos to control the swipe story backgrounds.
    story: [
      '/images/photos/joey-ana-05.jpg',
      '/images/photos/joey-ana-04.jpg',
      '/images/photos/joey-ana-02.jpg',
      '/images/photos/joey-ana-06.jpg',
      '/images/photos/joey-ana-07.jpg',
      '/images/photos/joey-ana-08.jpg',
      '/images/photos/joey-ana-03.jpg',
      '/images/photos/joey-ana-01.jpg',
    ],
  },
  // Change this one value to adjust darkness for every photo background.
  // 0 = no dark overlay, 100 = fully dark.
  photoDarkness: 70,
  travel: {
    title: 'Travel & Accommodation',
    // Replace these travel details with hotel blocks, shuttle details, airport notes, and local recommendations.
    body: 'Travel details, hotel recommendations, and weekend notes will be shared here as the celebration approaches.',
    contactLabel: 'For questions, contact the couple',
    // Replace this contact information with the preferred email, phone number, or WhatsApp contact.
    contact: 'wedding@example.com',
  },
  faq: [
    {
      question: 'Is the celebration adults-only?',
      answer:
        'Yes. This is an adults-only evening, except where special arrangements have been approved.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Formal evening attire. Black tie is welcome, and elegant evening wear is encouraged.',
    },
    {
      question: 'Where should guests stay?',
      answer:
        'Recommended hotels and travel notes will be added to the travel section as they are confirmed.',
    },
    {
      question: 'Can I bring a plus-one?',
      answer:
        'Please refer to the names listed on your invitation or RSVP details.',
    },
  ],
  seo: {
    title: 'Joey & Ana | Wedding Invitation',
    description:
      'Join Joey Rahme and Ana Maria Lahoud in Batroun, Lebanon, on August 8, 2026.',
    siteName: 'Joey & Ana Wedding',
    socialImageAlt: 'Joey and Ana wedding invitation preview',
  },
} as const;

export type WeddingConfig = typeof wedding;
