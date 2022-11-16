const listHelper = require('../utils/list_helper')
const blogData = require('./bloglist_data.js')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {
    test('when list has many blogs, equals the likes of that is 36', () => {
        const result = listHelper.totalLikes(blogData.blogs)
        expect(result).toBe(36)
    })
})

describe('facourte blog with most likes', () => {

    test('favourite blog wtih most likes', () => {
        const mostLikedObj = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        const result = listHelper.favoriteBlog(blogData.blogs)
        expect(result).toEqual(mostLikedObj)
    })

    test('author who has the largest amount of blogs', () => {
        const result = listHelper.mostBlogs(blogData.blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('author who has the most likes from all blogs', () => {
        const result = listHelper.mostLikes(blogData.blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

