export const APP_HEADER_ITEMS = [
  {
    id: 'about',
    label: 'About',
    route: 'about',
    pathnames: ['/app/About', '/app/Partners'],
    children: []
  },
  {
    id: 'search',
    label: 'Search'
  },
  {
    user: false,
    id: 'myrw',
    label: 'Log in'
  },
  {
    user: true,
    id: 'myrw',
    route: 'myrw',
    label: 'My Resource Watch',
    children: [
      { label: 'Admin', route: 'admin_home', admin: true },
      { label: 'Logout', id: 'logout' }
    ]
  }
];

export default { APP_HEADER_ITEMS };
