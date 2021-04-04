var express = require('express');
var router = express.Router();
var Cliente = require('../models/Cliente');

/* obtem lista de todos os registros ou filtrando pelo cod */
router.get('/:cod?', function (req, res, next) {
    if (req.params.cod) {
        Cliente.selectByCod(req.params.cod, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Cliente.selectAll(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

/* insere um novo registro */
router.put('/insert/', function (req, res, next) {
    Cliente.insert(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            Cliente.getLastID(
                function(err, count){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(count);
                    }
                }
            )
            //res.json(count);
        }
    });
});

/* deleta um registro */
router.delete('/delete/', function (req, res, next) {
    Cliente.delete(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

/* atualiza um registro */
router.post('/update/', function (req, res, next) {
    Cliente.update(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;