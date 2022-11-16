const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/User")

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { url: 1, author: 1, title: 1 })
    response.json(users)
})

userRouter.post("/", async (request, response) => {
    const body = request.body

    if (body.password.length < 3 || body.username.length < 3) {
        return response.status(400).send({ error: 'Both username and password must be at least 3 characters long' })
    }
    //generate the hash of the user's password and store it as passwordHash
    const passwordHash = await bcrypt.hash(body.password, 10)


    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser.toJSON())
})

module.exports = userRouter