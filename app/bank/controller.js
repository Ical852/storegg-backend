const Bank = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {
                message: alertMessage,
                status: alertStatus
            }

            const bank = await Bank.find()
            res.render('admin/bank/view_bank', {
                title: 'bank',
                req: req,
                path: 'bank',
                bank,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewCreate: async (req, res) => {
        try {
            res.render('admin/bank/create', {
                title: 'Create Bank',
                req: req,
                path: 'bank'
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionCreateBank: async (req, res) => {
        try {
            const { name, bankName, noRekening } = req.body
            let bank = await Bank.create({
                name, bankName, noRekening
            })

            await bank.save()

            req.flash('alertMessage', 'Success Create Bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({_id: id})

            res.render('admin/bank/edit', {
                title: 'Edit Bank',
                req: req,
                path: 'bank',
                bank
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionUpdateBank: async (req, res) => {
        try {
            const { id } = req.params
            const { name, bankName, noRekening } = req.body
            const bank = await Bank.findOne({
                _id: id
            })

            if (bank) {
                bank.name = name
                bank.bankName = bankName
                bank.noRekening = noRekening
            }
            await bank.save()

            req.flash('alertMessage', 'Success Update Bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionDeleteBank: async (req, res) => {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({ _id: id })
            if (bank) {
                bank.remove()
            }

            req.flash('alertMessage', 'Success Delete Bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}