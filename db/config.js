// require("dotenv").config();
// const mysql = require("mysql2");

// const dbConnection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     connectionLimit: 10,  
//     PORT: process.env.PORT || 5000
// });
// module.exports = dbConnection.promise()



require("dotenv").config();
const mysql = require("mysql2");

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: 10
});

module.exports = dbConnection.promise();
