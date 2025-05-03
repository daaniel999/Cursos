const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'esquema'
});
connection.connect((err) => {
  if (err) throw err;
});
module.exports = connection;