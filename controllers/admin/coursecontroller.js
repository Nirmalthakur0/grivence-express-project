const coursemodel = require('../../models/course')
const jwt = require('jsonwebtoken')

class coursecontroller {

    static addcourse = async (req, res) => {
        try {
            const { name, role,image } = req.data1
            const odata = await coursemodel.find()
            // console.log(data)

            res.render('admin/course/addcourse', { n: name, d: odata, role: role,img:image })

        } catch (error) {
            console.log(error)
        }

    };

    static insertcourse = async (req, res) => {
        try {
            const { cname } = req.body
            const result = new coursemodel({
                cname: cname,
            })
            await result.save()
            res.redirect('/addcourse')

        } catch (error) {
            console.log(error)
        }
    };

    static viewcourse = async (req, res) => {
        try {
            const { name, role,image } = req.data1
            const odata = await coursemodel.findById(req.params.id)

            res.render('admin/course/viewcourse', { n: name, d: odata, role: role ,img:image})

        } catch (error) {
            console.log(error)
        }
    }

    static editcourse = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, role,image } = req.data1
            const odata = await coursemodel.findById(req.params.id)

            res.render('admin/course/editcourse', { n: name, role: role, d: odata,msg:req.flash('error'),msg1:req.flash('update course success'),img:image })

        } catch (error) {

        }
    }

    static updatecourse = async (req, res) => {
        try {

            // console.log(req.body)
            const { cname, role, } = req.body
           var odata = { cname: cname }

            const id = (req.params.id)
            const update = await coursemodel.findByIdAndUpdate(id,odata)

            req.flash('success', 'update successfully')
            res.redirect('/addcourse')

        } catch (error) {
            console.log(error)
        }
    }

    static coursedelete = async (req, res) => {
        try {
            await coursemodel.findByIdAndDelete(req.params.id)
            res.redirect('/addcourse')
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = coursecontroller;