const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const commentRouter = require('express').Router()

commentRouter.get('/:id', async (request, response) => {
    const blogOwner = await Blog.findById(request.params.id)
    const comments = blogOwner.comments
    if (comments) {
        response.json(comments)
    } else {
        response.status(404).end()
    }
})

// commentRouter.get('/:id/comments', async (request, response) => {
//     const comments = await Comment.find({}).populate('blog')
//     if (comments) {
//         response.json(comments)
//     } else {
//         response.status(404).end()
//     }
// })

commentRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blogOwner = await Blog.findById(request.params.id)
    if (body.content === undefined) {
        return response.status(400).json({ error: 'comment is missing' })
    }
    const comment = new Comment({
        content: body.content,
        blog: blogOwner._id,
    })
    const savedComment = await comment.save()
    blogOwner.comments = blogOwner.comments.concat(savedComment._id)
    await blogOwner.save()
    response.json(savedComment.toJSON())
})

module.exports = commentRouter
