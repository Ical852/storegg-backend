var express = require('express');
var router = express.Router();
const {
    index,
    viewCreate,
    actionCreateBank,
    viewEdit,
    actionUpdateBank,
    actionDeleteBank
} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', actionCreateBank)
router.get('/edit/:id', viewEdit)
router.post('/update/:id', actionUpdateBank)
router.post('/delete/:id', actionDeleteBank)

module.exports = router;