export const APP_HEADER_ITEMS = [
  {
    id: 'about',
    label: 'About',
    route: 'about',
    pathnames: ['/app/About', '/app/Partners'],
    children: []
  },
  {
    admin: false,
    id: 'log_in',
    label: 'Log in',
    route: 'sign-in'
  },
  {
    admin: true,
    id: 'admin',
    route: 'admin_home',
    label: 'Admin'
  },
  {
    admin: true,
    id: 'logout',
    label: 'Log out',
    route: 'logout'
  }
];

export default { APP_HEADER_ITEMS };
