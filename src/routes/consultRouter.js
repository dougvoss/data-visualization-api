var express = require('express');
var router = express.Router();
var Consulta = require('../models/Consulta');

/* obtem lista de todos os registros ou filtrando pelo cod */
router.get('/:cod?', function (req, res, next) {
    if (req.params.cod) {
        Consulta.selectByCod(req.params.cod, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Consulta.selectAll(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

/* obtem lista de todos os registros ou filtrando pelo cod do cliente */
router.get('/getByCodCliente/:cod?', function (req, res, next) {
    Consulta.selectByCodCliente(req.params.cod, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

/* insere um novo registro */
router.put('/insert/', function (req, res, next) {
    Consulta.insert(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

/* deleta um registro */
router.delete('/delete/', function (req, res, next) {
    Consulta.delete(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

/* atualiza um registro */
router.post('/update/', function (req, res, next) {
    Consulta.update(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;