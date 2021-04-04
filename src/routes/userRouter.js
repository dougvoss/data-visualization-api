const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.list);
userRouter.get('/:userId', userController.show);
userRouter.post('/', userController.create);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userController.delete);



const router = express.Router();

router.get('/:cod?', function (req, res, next) {
    if (req.params.cod) {
        User.selectByCod(req.params.cod, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        User.selectAll(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/selectByCodCliente/:cod?', function (req, res, next) {
    User.selectByCodCliente(req.params.cod, res);
});

/* insere um novo registro */
router.put('/insert/', function (req, res, next) {
    User.insert(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

/* deleta um registro */
router.delete('/delete/', function (req, res, next) {
    User.delete(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

/* atualiza um registro */
router.post('/update/', function (req, res, next) {
    User.update(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = userRouter;