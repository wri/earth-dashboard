export const ADMIN_HEADER_ITEMS = [
  {
    id: 'data',
    label: 'Data',
    route: 'admin_data',
    pathnames: ['/admin/data', '/admin/DataDetail']
  },
  {
    id: 'pages',
    label: 'Pages',
    route: 'admin_pages',
    pathnames: ['/admin/pages', '/admin/PagesDetail']
  },
  {
    admin: true,
    id: 'logout',
    label: 'Log out',
    route: 'logout'
  }
];

export default { ADMIN_HEADER_ITEMS };
