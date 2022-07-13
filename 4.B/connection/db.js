const { Pool } = require('pg');

const dbPool = new Pool({
  database: 'provinsi_indonesia',
  port: '5432',
  user: 'postgres',
  password: '121212',
});

module.exports = dbPool;