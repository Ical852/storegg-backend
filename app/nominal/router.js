var express = require('express');
var router = express.Router();
const {
    index,
    viewCreate,
    actionCreateNominal,
    viewEdit,
    actionUpdateNominal,
    actionDeleteNominal
} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', actionCreateNominal)
router.get('/edit/:id', viewEdit)
router.post('/update/:id', actionUpdateNominal)
router.post('/delete/:id', actionDeleteNominal)

module.exports = router;