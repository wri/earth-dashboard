export const FOOTER_LINKS = [
  {
    id: 'about',
    label: 'About',
    route: 'about',
    pathnames: ['/app/About', '/app/Partners'],
    children: [
      { label: 'Partners', route: 'about_partners' },
      { label: 'FAQs', route: 'about_faqs' },
      { label: 'How to', route: 'about_howto' },
      { label: 'Contact us', route: 'about_contact-us' },
      { label: 'Terms of service', route: 'terms-of-service' },
      { label: 'Privacy Policy', route: 'privacy-policy' },
      { label: 'Attribution requirements', route: 'attribution-requirements' }
    ]
  }
];

export default { FOOTER_LINKS };
