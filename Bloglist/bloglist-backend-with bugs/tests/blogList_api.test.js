const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require("../app")
const Blog = require("../models/Blog")
const User = require("../models/user")
const helper = require("./apiHelper")
require('express-async-errors')
// const initialBlogs = [
//     {
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//     },
//     {
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//     }
// ]
// const blogsInDB = async () => {
//     const blogs = await Blog.find({})
//     return blogs.map(blog => blog.toJSON())
// }

// beforeEach(async () => {
//     await Blog.deleteMany({})
//     console.log("cleared out")
//     for (let blog of initialBlogs) {
//         let blogObject = new Blog(blog)
//         await blogObject.save()
//         console.log("a blog added to the database")
//     }
//     console.log("all the blos in initial list are added")
// })
const api = supertest(app)
let token
beforeAll(async () => {
    await User.deleteMany({})
    console.log("clear out the users")
    const testUser = { username: 'tester', password: 'testestest' }
    await api
        .post('/api/users')
        .send(testUser)

    const loggedInUser = await api
        .post("/api/login")
        .send(testUser)

    token = loggedInUser.body.token
})


beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("cleared out blogs")
    await Blog.insertMany(helper.initialBlogs)
    console.log("initial blogs are created")

})


//test: passed
test("the correct amount of blog posts are returned in JSON", async () => {

    await api
        .get("/api/blogList")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogEND = await helper.blogsInDB()
    expect(blogEND).toHaveLength(helper.initialBlogs.length)

}, 100000)

//
// const fetchNewFlavorIdea = () => {
//     return 1
// }
// test.only("test toBeDefined function of Jest", () => {
//     expect(fetchNewFlavorIdea()).toBeDefined();
// })

//test: passed
test("verifies that the unique identifier property", async () => {
    const blogs = await helper.blogsInDB()
    expect(blogs[0].id).toBeDefined();
})

describe("add a new blog to blog list via POST function", () => {

    //test: passed
    test("verify the default like property is set to 0 when it is missing from request", async () => {
        const newBlog = {
            title: "undefined likes-property",
            author: "supertest",
            url: "http://blablooblaa",
        }
        await supertest(app)
            .post("/api/blogList")
            .send(newBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)

        const blogEnd = await helper.blogsInDB()
        expect(blogEnd[2].likes).toEqual(0)
    }, 500000)

    //test: passed
    test("verifies HTTP POST request to the /api/blogs url", async () => {
        const newBlog = {
            title: "HTTP POST test",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/Test-http-POST.html",
            likes: 20
        }
        await supertest(app)
            .post("/api/blogList")
            .send(newBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)


        const blogEnd = await helper.blogsInDB()
        expect(blogEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    //test: passed
    test("blogs without title or url is not added", async () => {
        const newBlog = {
            author: "beepoobeepoo",
            likes: 12
        }
        await supertest(app)
            .post("/api/blogList")
            .send(newBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(400)

        const blogEnd = await helper.blogsInDB()
        expect(blogEnd).toHaveLength(helper.initialBlogs.length)
    }, 100000)
})

//test: passed
test("deletion of a blog", async () => {
    const newBlog = {
        title: "HTTP deletion test",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/Test-http-POST.html",
        likes: 20
    }
    await supertest(app)
        .post("/api/blogList")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)

    const bloglist = await helper.blogsInDB()
    const removeBlog = bloglist[bloglist.length - 1]

    await api
        .delete(`/api/blogList/${removeBlog.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204)

    const BlogEnd = await helper.blogsInDB()

    const blogEndContent = BlogEnd.map(blog => blog.title)
    expect(blogEndContent).not.toContain(removeBlog.title)

}, 100000)

//test: passed
test("udpation likes of a blog", async () => {
    const initialBloglist = await helper.blogsInDB()
    const blogToUpdate = initialBloglist[1]

    const updatedBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "www.updated likes for each blog",
        likes: 6,
    }
    await api
        .put(`/api/blogList/${blogToUpdate.id}`)
        .send(updatedBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)

    const BlogEnd = await helper.blogsInDB()
    const blogtoCheck = BlogEnd.find(blog => blog.id === blogToUpdate.id)

    expect(blogtoCheck.likes).toEqual(updatedBlog.likes)
})


test("adding a blog fails with status code 401 Unauthorized without providing a token", async () => {
    const newBlog = {
        title: "test without providing valid token",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com"
    }

    await api
        .post('/api/blogList')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogEnd = await helper.blogsInDB()

    expect(blogEnd).toHaveLength(helper.initialBlogs.length)
}, 10000)


afterAll(() => mongoose.connection.close())