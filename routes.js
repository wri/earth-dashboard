// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= ADMIN ROUTES =====================
routes.add('admin_home', '/admin', 'admin/data');
// admin - data
routes.add('admin_data', '/admin/data/:tab?', 'admin/data');
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/data-detail');

// ========================= APP ROUTES =====================
routes.add('home', '/', 'app/home');

// ---- ABOUT ----
routes.add('about', '/about', 'app/about');

// ------- USER MANAGEMENT  -------------
routes.add('sign-in', '/sign-in', 'app/sign-in');
routes.add('forgot-password', '/forgot-password', 'app/forgot-password');
routes.add('reset-password', '/reset-password/:tokenEmail?', 'app/reset-password');

module.exports = routes;
