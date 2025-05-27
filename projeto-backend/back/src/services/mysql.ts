import mysql from 'mysql2/promise';

export const mysqlConnection = mysql.createPool({
  host: 'br726.hostgator.com.br',
  user: 'hydros28',
  password: 'A9302pbycW',
  database: 'hydros28_estfrn02',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});
