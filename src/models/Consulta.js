var db = require('../config/dbconnection'); //reference of dbconnection.js

var TABELA = 'consulta',
    COD =                   'cod',
    COD_USUARIO_CRIACAO =   'cod_usuario_criacao',
    COD_USUARIO_ALTERACAO = 'cod_usuario_alteracao',
    COD_USUARIO_EXCLUSAO =  'cod_usuario_exclusao',
    DATA_CRIACAO =          'data_criacao',
    DATA_ALTERACAO =        'data_alteracao',
    DATA_EXCLUSAO =         'data_exclusao',
    ATIVO =                 'ativo',
    NOME =                  'nome',   
    DESCRICAO =             'descricao';
    TEXTO_SQL =             'texto_sql',
    TIPO_GRAFICO =          'tipo_grafico';

var Consulta = {
    selectAll: function (callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + COD_USUARIO_CRIACAO + ", "
                            + COD_USUARIO_ALTERACAO + ", "
                            + COD_USUARIO_EXCLUSAO + ", "
                            + "date_format(" + DATA_CRIACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_CRIACAO + ", "
                            + "date_format(" + DATA_ALTERACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_ALTERACAO + ", "
                            + "date_format(" + DATA_EXCLUSAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_EXCLUSAO + ", "
                            + NOME + ", "
                            + ATIVO + ", "
                            + DESCRICAO + ", "
                            + TEXTO_SQL + ", "
                            + TIPO_GRAFICO
                            + " FROM " + TABELA;

        return db.query(queryString, callback);

    },
    selectByCod: function (id, callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + COD_USUARIO_CRIACAO + ", "
                            + COD_USUARIO_ALTERACAO + ", "
                            + COD_USUARIO_EXCLUSAO + ", "
                            + "date_format(" + DATA_CRIACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_CRIACAO + ", "
                            + "date_format(" + DATA_ALTERACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_ALTERACAO + ", "
                            + "date_format(" + DATA_EXCLUSAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_EXCLUSAO + ", "
                            + NOME + ", "
                            + ATIVO + ", "
                            + DESCRICAO + ", "
                            + TEXTO_SQL + ", "
                            + TIPO_GRAFICO
                            + " FROM " + TABELA + " WHERE " + COD + " = ?";

        return db.query(queryString, [id], callback);
    },
    selectByCodCliente: function (id, callback) {
        var queryString = "SELECT "
                            + "con." + COD + ", "
                            + "con." + COD_USUARIO_CRIACAO + ", "
                            + "con."  + COD_USUARIO_ALTERACAO + ", "
                            + "con."  + COD_USUARIO_EXCLUSAO + ", "
                            + "date_format(" + "con." + DATA_CRIACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_CRIACAO + ", "
                            + "date_format(" + "con." + DATA_ALTERACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_ALTERACAO + ", "
                            + "date_format(" + "con." + DATA_EXCLUSAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_EXCLUSAO + ", "
                            + "con." + NOME + ", "
                            + "con." + ATIVO + ", "
                            + "con." + DESCRICAO + ", "
                            + "con." + TEXTO_SQL + ", "
                            + "con." + TIPO_GRAFICO
                            + " FROM consulta_cliente concli " 
                            + " left join " + TABELA + " con on con." + COD + " = concli.cod_consulta "
                            + " WHERE concli.cod_cliente = ?";

        return db.query(queryString, [id], callback);
    },
    insert: function (data, callback) {
        var queryString = "INSERT INTO " + TABELA + " ( "
                            + DATA_CRIACAO + ", "
                            + NOME + ", "
                            + ATIVO + ", "
                            + DESCRICAO + ", "
                            + TEXTO_SQL + ", "
                            + TIPO_GRAFICO
                            + ") VALUES ( STR_TO_DATE( ? , '%d/%m/%Y %H:%i:%s' ) ,?,?,?,?,?)";
        if (data.admin !== 'V'){
            data.admin = 'F';
        }
        var DATA_FIELDS = [
            data.data_criacao, 
            data.nome,
            data.ativo, 
            data.descricao,
            data.texto_sql,
            data.tipo_grafico];

        return db.query(queryString, DATA_FIELDS, callback);
    },
    delete: function (data, callback) {
        var queryString = "UPDATE " + TABELA + " SET " 
                            + ATIVO + " = 'F' "+
                            " WHERE " + COD + " = ? ";
        var DATA_FIELDS = [
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    },
    update: function (data, callback) {
        var queryString = "UPDATE " + TABELA + " SET " 
                            + ATIVO + " = ? , "
                            + NOME + " = ? , "
                            + DESCRICAO + " = ? , "
                            + TEXTO_SQL + " = ? , "
                            + TIPO_GRAFICO + " = ? " 
                            + " WHERE " + COD + " = ? ";

        var DATA_FIELDS = [
            data.ativo, 
            data.nome,
            data.descricao,
            data.texto_sql,
            data.tipo_grafico,
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    }
};
module.exports = Consulta;