var express = require('express');
var router = express.Router();
const {
    index,
    viewCreate,
    actionCreatepayment,
    viewEdit,
    actionUpdatepayment,
    actionDeletepayment
} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', actionCreatepayment)
router.get('/edit/:id', viewEdit)
router.post('/update/:id', actionUpdatepayment)
router.post('/delete/:id', actionDeletepayment)

module.exports = router;