var db = require('../config/dbconnection'); 

var TABELA = 'cliente',
    COD =                   'cod',
    COD_USUARIO_CRIACAO =   'cod_usuario_criacao',
    COD_USUARIO_ALTERACAO = 'cod_usuario_alteracao',
    COD_USUARIO_EXCLUSAO =  'cod_usuario_exclusao',
    DATA_CRIACAO =          'data_criacao',
    DATA_ALTERACAO =        'data_alteracao',
    DATA_EXCLUSAO =         'data_alteracao',
    ATIVO =                 'ativo',
    NOME =                  'nome',   
    ID_NACIONAL =           'id_nacional';
    CEP =                   'cep',
    RUA =                   'rua',
    NUMERO =                'numero',
    BAIRRO =                'bairro',
    CIDADE =                'cidade',
    TELEFONE =              'telefone',
    EMAIL =                 'email',
    BD_PATH =               'bd_path',
    BD_PORT =               'bd_port',
    BD_USER =               'bd_user',
    BD_PASS =               'bd_pass',
    BD_NAME =               'bd_name',
    BD_TIPO =               'bd_tipo';

var Cliente = {
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
                            + ID_NACIONAL + ", "
                            + CEP + ", "
                            + RUA + ", "
                            + NUMERO + ", "
                            + BAIRRO + ", "
                            + CIDADE + ", "
                            + TELEFONE + ", "
                            + EMAIL + ", "
                            + BD_PATH + ", "
                            + BD_PORT + ", "
                            + BD_USER + ", "
                            + BD_PASS + ", "
                            + BD_NAME + ", "
                            + BD_TIPO
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
                            + ID_NACIONAL + ", "
                            + CEP + ", "
                            + RUA + ", "
                            + NUMERO + ", "
                            + BAIRRO + ", "
                            + CIDADE + ", "
                            + TELEFONE + ", "
                            + EMAIL + ", "
                            + BD_PATH + ", "
                            + BD_PORT + ", "
                            + BD_USER + ", "
                            + BD_PASS + ", "
                            + BD_NAME + ", "
                            + BD_TIPO
                            + " FROM " + TABELA + " WHERE " + COD + " = ?";

        return db.query(queryString, [id], callback);
    },

    getLastID: function(callback){
        return db.query("select LAST_INSERT_ID() as cod;", callback);
    },
    insert: function (data, callback) {
        var queryString = "INSERT INTO " + TABELA + " ( "
                            + DATA_CRIACAO + ", "
                            + NOME + ", "
                            + ATIVO + ", "
                            + ID_NACIONAL + ", "
                            + CEP + ", "
                            + RUA + ", "
                            + NUMERO + ", "
                            + BAIRRO + ", "
                            + CIDADE + ", "
                            + TELEFONE + ", "
                            + EMAIL + ", "
                            + BD_PATH + ", "
                            + BD_PORT + ", "
                            + BD_USER + ", "
                            + BD_PASS + ", "
                            + BD_NAME + ", "
                            + BD_TIPO 
                            + ") VALUES (STR_TO_DATE( ? , '%d/%m/%Y %H:%i:%s' ) ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var DATA_FIELDS = [
            data.data_criacao, 
            data.nome,
            data.ativo, 
            data.id_nacional,
            data.cep,
            data.rua,
            data.numero,
            data.bairro,
            data.cidade,
            data.telefone,
            data.email,
            data.bd_path,
            data.bd_port,
            data.bd_user,
            data.bd_pass,
            data.bd_name,
            data.bd_tipo];
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

    ultimo:function (callback) {
        var queryString = "SELECT cod FROM cliente ORDER BY cod DESC LIMIT 1 "
        return db.query(queryString, callback);
    },

    update: function (data, callback) {
        var queryString = "UPDATE " + TABELA + " SET " 
                            + ATIVO + " = ? , "
                            + NOME + " = ? , "
                            + ID_NACIONAL + " = ? , "
                            + CEP + " = ? , "
                            + RUA + " = ? , "
                            + NUMERO + " = ? , "
                            + BAIRRO + " = ? , "
                            + CIDADE + " = ? , "
                            + TELEFONE + " = ? , "
                            + EMAIL + " = ? , "   
                            + BD_PATH + " = ? , "   
                            + BD_PORT + " = ? , "   
                            + BD_USER + " = ? , "   
                            + BD_PASS + " = ? , "   
                            + BD_NAME + " = ? , "   
                            + BD_TIPO + " = ? " 
                            + " WHERE " + COD + " = ? ";

        if (data.admin !== 'V'){
            data.admin = 'F';
        }
        var DATA_FIELDS = [
            data.ativo, 
            data.nome,
            data.id_nacional,
            data.cep,
            data.rua,
            data.numero,
            data.bairro,
            data.cidade,
            data.telefone,
            data.email,
            data.bd_path,
            data.bd_port,
            data.bd_user,
            data.bd_pass,
            data.bd_name,
            data.bd_tipo,
            data.cod];

        return db.query(queryString, DATA_FIELDS, callback);
    }
};
module.exports = Cliente;