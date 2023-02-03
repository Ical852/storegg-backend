const Nominal = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {
                message: alertMessage,
                status: alertStatus
            }

            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal', {
                title: 'Nominal',
                req: req,
                path: 'nominal',
                nominal,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    viewCreate: async (req, res) => {
        try {
            res.render('admin/nominal/create', {
                title: 'Create Nominal',
                req: req,
                path: 'nominal'
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionCreateNominal: async (req, res) => {
        try {
            const {
                coinName, coinQuantity, price
            } = req.body
            let nominal = await Nominal.create({
                coinName, coinQuantity, price
            })

            await nominal.save()

            req.flash('alertMessage', 'Success Create Nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({_id: id})

            res.render('admin/nominal/edit', {
                title: 'Edit Nominal',
                req: req,
                path: 'nominal',
                nominal
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionUpdateNominal: async (req, res) => {
        try {
            const { id } = req.params
            const {
                coinName, coinQuantity, price
            } = req.body
            const nominal = await Nominal.findOne({
                _id: id
            })

            if (nominal) {
                nominal.coinName = coinName
                nominal.coinQuantity = coinQuantity
                nominal.price = price
            }
            await nominal.save()

            req.flash('alertMessage', 'Success Update Nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionDeleteNominal: async (req, res) => {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({ _id: id })
            if (nominal) {
                nominal.remove()
            }

            req.flash('alertMessage', 'Success Delete Nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }
}