const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    Blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
})

commentSchema.set('toJSON', {
    transform: (document, returnedOBJ) => {
        returnedOBJ.id = returnedOBJ._id.toString()
        delete returnedOBJ._id
        delete returnedOBJ.__v
    },
})

module.exports = mongoose.model('Comment', commentSchema)
