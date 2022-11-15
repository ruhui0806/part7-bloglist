const commentRouter = require('express').Router()
const Comment = require('../models/Comment')
const Blog = require('../models/Blog')
// const jwt = require('jsonwebtoken')
require('express-async-errors')

commentRouter.get('/:id', async (request, response) => {
    const blog = Blog.findById(request.params.id)
    const comments = blog.comments
    if (comments) {
        response.json(comments)
    } else {
        response.status(404).end()
    }
})

commentRouter.post('/:id/comments', async (request, response) => {
    console.log('bleep bloop 1')
    const body = request.body
    if (!body) {
        console.log('bleep bloop null')
        return null
    }
    console.log(body)
    console.log('bleep bloop 2')

    const blog = await Blog.findById(request.params.id)
    console.log('bleep bloop 3')
    console.log(blog)

    // const comments = blog.comments
    const Newcomment = new Comment({ content: body.content, Blog: blog._id })
    console.log('bleep bloop 4')

    const savedComment = await Newcomment.save()
    console.log('bleep bloop 5')

    blog.comments = blog.comments.concat(savedComment._id)
    console.log('bleep bloop 6')

    await blog.save()
    console.log('bleep bloop 7')
    response.json(savedComment.toJSON())
})

module.exports = commentRouter
