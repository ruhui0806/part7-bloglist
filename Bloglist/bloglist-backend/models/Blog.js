const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.pre('remove', function (next) {

  this.model('User').remove({ blogs: this._id }, next);
})


blogSchema.set('toJSON', {
  transform: (document, returnedOBJ) => {
    returnedOBJ.id = returnedOBJ._id.toString()
    delete returnedOBJ._id
    delete returnedOBJ.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)