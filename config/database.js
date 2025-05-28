const mysql = require('mysql');


// Configuração do MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Libera@123",
    database: fazai
});


module.exports = {
    db,
};