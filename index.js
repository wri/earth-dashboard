const path = require('path');

const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');

const port = process.env.PORT || '3000';
process.argv.length = 1;
process.argv.push(nextPath, 'start', port);

// eslint-disable-next-line import/no-dynamic-require
require(nextPath);
