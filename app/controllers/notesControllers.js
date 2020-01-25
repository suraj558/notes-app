const Note = require('../modals/note')


module.exports.list = (req,res) => {
    const { user } = req
    Note.find({user: user._id}).populate('category', ['name'])
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Note.findOne({user: user._id, _id: id}).populate('category', ['name'])
        .then((note) => {
            if(note){
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const note = new Note(body)
    note.save()
        .then((note) => {
            Note.findOne({_id: note._id}).populate('category', ['name'])
                .then((note) => {
                    res.send(note)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Note.findOneAndUpdate({user: user._id, _id: id}, body, {new: true, runValidators: true}).populate('category', ['name'])
        .then((note) => {
            if(note){
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res,json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Note.findOneAndDelete({user: user._id, _id: id})
        .then((note) => {
            if(note){
                res.json({note})
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}