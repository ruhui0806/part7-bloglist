const User = require("../models/user")
const bcrypt = require("bcrypt")
const helper = require("./apiHelper")
const app = require("../app")
const supertest = require("supertest")
const mongoose = require('mongoose')

const api = supertest(app)

describe("there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        console.log("clear out")

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", passwordHash })

        await user.save()
    })

    test("create new user succeessfully with a new username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ruhuipopo",
            name: "Ruhui",
            password: "salainen"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("invalid users are not created and the operation returns a suitable status code and error message", async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUser = {
            username: "AA",
            name: "invalidUser",
            password: "--"
        }
        // const TestErrorMessageFunc = function (res) {
        //     res.error.should.toContain("Both username and password must be at least 3 characters long");
        // };
        const result = await api
            .post("/api/users")
            .send(invalidUser)
            .expect(400)

        expect(result.body.error).toContain("Both username and password must be at least 3 characters long")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
afterAll(() => mongoose.connection.close())