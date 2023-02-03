var express = require('express');
var router = express.Router();
const multer = require('multer')
const os = require('os')
const {
    index,
    viewCreate,
    actionCreateVoucher,
    viewEdit,
    actionUpdateVoucher,
    actionDeleteVoucher,
    actionActivate,
    actionDeactivate
} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', multer({dest: os.tmpdir()}).single('image'), actionCreateVoucher)
router.get('/edit/:id', viewEdit)
router.post('/update/:id', multer({dest: os.tmpdir()}).single('image'), actionUpdateVoucher)
router.post('/delete/:id', actionDeleteVoucher)
router.post('/activate/:id', actionActivate)
router.post('/deactivate/:id', actionDeactivate)

module.exports = router;