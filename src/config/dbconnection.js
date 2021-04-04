var mysql = require('mysql');

var connection = mysql.createConnection({

    host: 'rdsramais.cncn4cn3auep.sa-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'sispack',
    password: 'masterkey',
    database: 'graficos',

});
module.exports = connection;