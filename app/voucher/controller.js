const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {
                message: alertMessage,
                status: alertStatus
            }

            const voucher = await Voucher.find()
                .populate('category')
                .populate('nominals')
            
            res.render('admin/voucher/view_voucher', {
                title: 'Voucher',
                req: req,
                path: 'voucher',
                voucher,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    viewCreate: async (req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            res.render('admin/voucher/create', {
                title: 'Create Voucher',
                req: req,
                path: 'voucher',
                category,
                nominal
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionCreateVoucher: async (req, res) => {
        try {
            const { name, category, nominals } = req.body

            if (req.file) {
                let tmp_path = req.file.path
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let filename = req.file.filename + '.' + originalExt
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        await voucher.save()

                        req.flash('alertMessage', 'Success Create Voucher')
                        req.flash('alertStatus', 'success')
                        res.redirect('/voucher')
                    } catch (error) {
                        req.flash('alertMessage', `error : ${error.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/voucher')
                    }
                })
            } else {
                try {
                    const voucher = new Voucher({
                        name,
                        category,
                        nominals,
                    })

                    await voucher.save()

                    req.flash('alertMessage', 'Success Create Voucher')
                    req.flash('alertStatus', 'success')
                    res.redirect('/voucher')
                } catch (error) {
                    req.flash('alertMessage', `error : ${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/voucher')
                }
            }

        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    viewEdit: async (req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            const { id } = req.params
            const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals')

            res.render('admin/voucher/edit', {
                title: 'Edit Voucher',
                req: req,
                path: 'voucher',
                voucher,
                category,
                nominal
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionUpdateVoucher: async (req, res) => {
        try {
            const {id} = req.params
            const { name, category, nominals } = req.body

            if (req.file) {
                let tmp_path = req.file.path
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let filename = req.file.filename + '.' + originalExt
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const voucher  = await Voucher.findOne({_id: id})

                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage)
                        }

                        await Voucher.findOneAndUpdate({ _id: id }, 
                        {
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        req.flash('alertMessage', 'Success Update Voucher')
                        req.flash('alertStatus', 'success')
                        res.redirect('/voucher')
                    } catch (error) {
                        req.flash('alertMessage', `error : ${error.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/voucher')
                    }
                })
            } else {
                try {
                    await Voucher.findOneAndUpdate({
                        _id: id
                    }, {
                        name,
                        category,
                        nominals,
                    })

                    req.flash('alertMessage', 'Success Update Voucher')
                    req.flash('alertStatus', 'success')
                    res.redirect('/voucher')
                } catch (error) {
                    req.flash('alertMessage', `error : ${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/voucher')
                }
            }
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionDeleteVoucher: async (req, res) => {
        try {
            const { id } = req.params
            const voucher = await Voucher.findOne({ _id: id })
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
            if (fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage)
            }
            if (voucher) {
                voucher.remove()
            }

            req.flash('alertMessage', 'Success Delete Voucher')
            req.flash('alertStatus', 'success')

            res.redirect('/voucher')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionActivate: async (req, res) => {
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id: id})

            if (voucher) {
                voucher.status = "Y"
            }

            await voucher.save()


            req.flash('alertMessage', 'Success Activate Voucher')
            req.flash('alertStatus', 'success')

            res.redirect('/voucher')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionDeactivate: async (req, res) => {
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id: id})

            if (voucher) {
                voucher.status = "N"
            }

            await voucher.save()

            req.flash('alertMessage', 'Success Deactivate Voucher')
            req.flash('alertStatus', 'success')

            res.redirect('/voucher')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    }
}