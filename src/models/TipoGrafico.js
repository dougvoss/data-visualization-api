var db = require('../config/dbconnection'); //reference of dbconnection.js

var TABELA = 'tipo_grafico',
    COD =                   'cod',
    NOME =                  'nome',
    ATIVO =                 'ativo';

var TipoGrafico = {
    selectAll: function (callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + NOME + ", "
                            + ATIVO
                            + " FROM " + TABELA;

        return db.query(queryString, callback);

    },
    selectByCod: function (id, callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + NOME + ", "
                            + ATIVO
                            + " FROM " + TABELA 
                            + " WHERE " + COD + " = ?";
        return db.query(queryString, [id], callback);
    },
    insert: function (data, callback) {
        var queryString = "INSERT INTO " + TABELA + " ( "
                            + NOME + ", "
                            + ATIVO
                            + ") VALUES (?,?)";
        var DATA_FIELDS = [
            data.nome,
            data.ativo];

        return db.query(queryString, DATA_FIELDS, callback);
    },
    delete: function (data, callback) {
        var queryString = "UPDATE " + TABELA + " SET " 
                            + ATIVO + " = 'F' " +
                            " WHERE " + COD + " = ? ";
        var DATA_FIELDS = [
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    },
    update: function (data, callback) {
        var queryString = "UPDATE " + TABELA + " SET "
                            + NOME + " = ? ,"
                            + ATIVO + " = ? "
                            + " WHERE " + COD + " = ? ";

        var DATA_FIELDS = [
            data.nome,
            data.ativo,
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    }
};
module.exports = TipoGrafico;