// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= ADMIN ROUTES =====================
routes.add('admin_home', '/admin', 'admin/data');
// admin - data
routes.add('admin_data', '/admin/data/:tab?', 'admin/data');
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/data-detail');
// admin - partners
routes.add('admin_partners', '/admin/partners/:tab?', 'admin/partners');
routes.add('admin_partners_detail', '/admin/partners/:tab/:id/:subtab?', 'admin/partners-detail');
// admin - pages
routes.add('admin_pages', '/admin/pages/:tab?', 'admin/pages');
routes.add('admin_pages_detail', '/admin/pages/:tab/:id/:subtab?', 'admin/pages-detail');

// ========================= APP ROUTES =====================
routes.add('home', '/', 'app/home');

// ---- ABOUT ----
routes.add('about', '/about', 'app/about');

// ------- USER MANAGEMENT  -------------
routes.add('sign-in', '/sign-in', 'app/sign-in');
routes.add('forgot-password', '/forgot-password', 'app/forgot-password');
routes.add('reset-password', '/reset-password/:tokenEmail?', 'app/reset-password');

module.exports = routes;
