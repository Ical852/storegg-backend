const Category = require('./model')

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status : alertStatus}

            const category = await Category.find()
            res.render('admin/category/view_category', {
                title: 'Category',
                req: req,
                path: 'category',
                category,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    viewCreate: async(req, res) => {
        try {
            res.render('admin/category/create', {
                title: 'Create Category',
                req: req,
                path: 'category'
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionCreateCategory: async(req,res) => {
        try {
            const {name} = req.body
            let category = await Category.create({
                name: name
            })

            await category.save()

            req.flash('alertMessage', 'Success Create Category')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    viewEdit: async(req,res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})

            res.render('admin/category/edit', {
                title: 'Edit Category',
                req: req,
                path: 'category',
                category
            })
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionUpdateCategory: async(req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body
            const category = await Category.findOne({_id: id})
            
            if (category) {
                category.name = name
            }
            await category.save()
            
            req.flash('alertMessage', 'Success Update Category')
            req.flash('alertStatus', 'success')
            
            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionDeleteCategory: async(req,res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})
            if (category) {
                category.remove()
            }

            req.flash('alertMessage', 'Success Delete Category')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `error : ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}