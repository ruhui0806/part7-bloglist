//express object has a Router() method that creates a new router object, which you can add middleware and HTTP methods to it just as app:
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('express-async-errors')

////refactor to async-await:
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1 })
        .populate('comments')
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('comments')
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})


blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author === undefined ? 'unknown' : body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        comments: [],
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
    // // const body = request.body
    console.log('bleep bloop')
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const userOwner = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if (userOwner._id.toString() === blog.user._id.toString()) {
        // await Blog.findByIdAndRemove(request.params.id)
        try {
            await Blog.deleteOne(blog)
            response.status(204).end()
        } catch (exception) {
            next(exception)
        }
    } else {
        console.log('-->', userOwner._id.toString())
        console.log('-->', blog.user._id.toString())
        return response
            .status(401)
            .json({ error: 'unauthorized action:token missing or invalid' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
    response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
