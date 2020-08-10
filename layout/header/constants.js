export const APP_HEADER_ITEMS = [
  {
    id: 'about',
    label: 'About',
    route: 'about',
    pathnames: ['/app/About', '/app/Partners'],
    children: []
  },
  {
    user: false,
    id: 'log_in',
    label: 'Log in'
  },
  {
    admin: true,
    id: 'admin',
    route: 'admin_home',
    label: 'Admin'
  }
];

export default { APP_HEADER_ITEMS };
