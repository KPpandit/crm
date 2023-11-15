const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "Test",
    password :"root"
  },
 
);
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });
module.exports = connection;    
