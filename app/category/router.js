var express = require('express');
var router = express.Router();
const {
    index,
    viewCreate,
    actionCreateCategory,
    viewEdit,
    actionUpdateCategory,
    actionDeleteCategory
} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index)
router.get('/create', viewCreate)
router.post('/create', actionCreateCategory)
router.get('/edit/:id', viewEdit)
router.post('/update/:id', actionUpdateCategory)
router.post('/delete/:id', actionDeleteCategory)

module.exports = router;