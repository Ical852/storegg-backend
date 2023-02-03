const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {
                message: alertMessage,
                status: alertStatus
            }

            const payment = await Payment.find().populate('banks')
            res.render('admin/payment/view_payment', {
                title: 'Payment',
                req: req,
                path: 'payment',
                payment,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewCreate: async (req, res) => {
        try {
            
            const bank = await Bank.find()
            res.render('admin/payment/create', {
                title: 'Create Payment',
                req: req,
                path: 'payment',
                bank
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionCreatepayment: async (req, res) => {
        try {
            const { type, banks } = req.body
            let payment = await Payment.create({
                type, banks
            })

            await payment.save()

            req.flash('alertMessage', 'Success Create Payment')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params

            const bank = await Bank.find()
            const payment = await Payment.findOne({_id: id}).populate('banks')

            res.render('admin/payment/edit', {
                title: 'Edit Payment',
                req: req,
                path: 'payment',
                payment,
                bank
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionUpdatepayment: async (req, res) => {
        try {
            const { id } = req.params
            const { type, banks } = req.body
            const payment = await Payment.findOne({ _id: id })

            if (payment) {
                payment.type = type
                payment.banks = banks
            }
            await payment.save()

            req.flash('alertMessage', 'Success Update Payment')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionDeletepayment: async (req, res) => {
        try {
            const { id } = req.params
            const payment = await Payment.findOne({ _id: id })
            if (payment) {
                payment.remove()
            }

            req.flash('alertMessage', 'Success Delete Payment')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}