export const ADMIN_HEADER_ITEMS = [
  {
    id: "data",
    label: "Data",
    route: "admin_data",
    pathnames: ["/admin/data", "/admin/DataDetail"]
  },
  {
    admin: true,
    id: "logout",
    label: "Log out",
    route: "logout"
  }
];

export default { ADMIN_HEADER_ITEMS };
