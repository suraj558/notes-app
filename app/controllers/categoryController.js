const Category = require('../modals/category')
const Note = require('../modals/note')

module.exports.list = (req,res) => {
    const { user } = req
    Category.find({user: user._id})
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Promise.all([Category.findOne({user: user._id, _id: id }), Note.find({user: user._id, category: id})])
        .then((values) => {
            const [category, notes] = values
                const categoryObj = category.toObject()
                categoryObj.notes = notes
                res.send(categoryObj)
          })
        .catch((err) => {
            res.send(err)
        })
}



module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Category.findOneAndUpdate({user: user._id , _id: id}, body, {new: true, runValidators: true})
        .then((category) => {
            if(category){
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Category.findOneAndDelete({user: user._id , _id: id})
        .then((category) => {
            if(category){
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}