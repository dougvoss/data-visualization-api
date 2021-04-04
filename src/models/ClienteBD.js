var db = require('../config/dbconnection'); //reference of dbconnection.js

var TABELA = 'cliente_bd',
    COD =                   'cod',
    COD_USUARIO_CRIACAO =   'cod_usuario_criacao',
    COD_USUARIO_ALTERACAO = 'cod_usuario_alteracao',
    COD_USUARIO_EXCLUSAO =  'cod_usuario_exclusao',
    DATA_CRIACAO =          'data_criacao',
    DATA_ALTERACAO =        'data_alteracao',
    DATA_EXCLUSAO =         'data_alteracao',
    ATIVO =                 'ativo',
    NOME =                  'nome',   
    DESCRICAO =             'descricao';
    CAMINHO =               'caminho',
    PORTA =                 'porta',
    USUARIO =               'usuario',
    SENHA =                 'senha',
    NOME_BD =               'nome_bd',
    COD_CLIENTE =           'cod_cliente',
    COD_TIPO_BD =           'cod_tipo_bd';

var ClienteBD = {
    selectAll: function (callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + COD_USUARIO_CRIACAO + ", "
                            + COD_USUARIO_ALTERACAO + ", "
                            + COD_USUARIO_EXCLUSAO + ", "
                            + "date_format(" + DATA_CRIACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_CRIACAO + ", "
                            + "date_format(" + DATA_ALTERACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_ALTERACAO + ", "
                            + "date_format(" + DATA_EXCLUSAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_EXCLUSAO + ", "
                            + ATIVO + ", "
                            + NOME + ", "
                            + DESCRICAO + ", "
                            + CAMINHO + ", "
                            + PORTA + ", "
                            + USUARIO + ", "
                            + SENHA + ", "
                            + NOME_BD + ", "
                            + COD_TIPO_BD + ", "
                            + COD_CLIENTE
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
                            + ATIVO + ", "
                            + NOME + ", "
                            + DESCRICAO + ", "
                            + CAMINHO + ", "
                            + PORTA + ", "
                            + USUARIO + ", "
                            + SENHA + ", "
                            + NOME_BD + ", "
                            + COD_TIPO_BD + ", "
                            + COD_CLIENTE
                            + " FROM " + TABELA + " WHERE " + COD + " = ?";

        return db.query(queryString, [id], callback);
    },
    selectByCodCliente: function (id, callback) {
        var queryString = "SELECT "
                            + COD + ", "
                            + COD_USUARIO_CRIACAO + ", "
                            + COD_USUARIO_ALTERACAO + ", "
                            + COD_USUARIO_EXCLUSAO + ", "
                            + "date_format(" + DATA_CRIACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_CRIACAO + ", "
                            + "date_format(" + DATA_ALTERACAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_ALTERACAO + ", "
                            + "date_format(" + DATA_EXCLUSAO + ", '%d/%m/%Y %h:%i:%s') as " + DATA_EXCLUSAO + ", "
                            + ATIVO + ", "
                            + NOME + ", "
                            + DESCRICAO + ", "
                            + CAMINHO + ", "
                            + PORTA + ", "
                            + USUARIO + ", "
                            + SENHA + ", "
                            + NOME_BD + ", "
                            + COD_TIPO_BD + ", "
                            + COD_CLIENTE
                            + " FROM " + TABELA + " WHERE " + COD_CLIENTE + " = ?";

        return db.query(queryString, [id], callback);
    },
    insert: function (data, callback) {
        var queryString = "INSERT INTO " + TABELA + " ( "
                            + DATA_CRIACAO + ", "
                            + ATIVO + ", "
                            + NOME + ", "
                            + DESCRICAO + ", "
                            + CAMINHO + ", "
                            + PORTA + ", "
                            + USUARIO + ", "
                            + SENHA + ", "
                            + NOME_BD + ", "
                            + COD_TIPO_BD + ", "
                            + COD_CLIENTE
                            + ") VALUES ( STR_TO_DATE( ? , '%d/%m/%Y %H:%i:%s' ) ,?,?,?,?,?,?,?,?,?,?)";
        if (data.admin !== 'V'){
            data.admin = 'F';
        }
        var DATA_FIELDS = [
            data.data_criacao, 
            data.ativo,
            data.nome, 
            data.descricao,
            data.caminho,
            data.porta,
            data.usuario,
            data.senha,
            data.nome_bd,
            data.cod_tipo_bd,
            data.cod_cliente];

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
                            + CAMINHO + " = ? , "
                            + PORTA + " = ? , "
                            + USUARIO + " = ? , "
                            + SENHA + " = ? , "
                            + NOME_BD + " = ? , "
                            + COD_TIPO_BD + " = ? , "
                            + COD_CLIENTE + " = ? "
                            + " WHERE " + COD + " = ? ";

        if (data.admin !== 'V'){
            data.admin = 'F';
        }
        var DATA_FIELDS = [
            data.ativo, 
            data.nome,
            data.descricao,
            data.caminho,
            data.porta,
            data.usuario,
            data.senha,
            data.nome_bd,
            data.cod_tipo_bd,
            data.cod_cliente,
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    }
};
module.exports = ClienteBD;