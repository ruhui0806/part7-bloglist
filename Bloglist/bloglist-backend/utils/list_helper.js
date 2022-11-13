var _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

//The function finds out which blog has most likes.
const favoriteBlog = (array) => {
    let mostLikes = Math.max(...array.map(item => item.likes))

    const mostLikedBlog = array.find(item => item.likes === mostLikes)

    delete mostLikedBlog._id;
    delete mostLikedBlog.url;
    delete mostLikedBlog.__v

    return mostLikedBlog
}

//The function returns the total sum of likes in all of the blog posts
const totalLikes = (array) => {
    let arrayLikes = array.map(array => array.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return arrayLikes.reduce(reducer, 0)
}

//The function returns the author who has the largest amount of blogs.
const mostBlogs = (array) => {
    //count the sum of blogs from blogs for each author
    const blogCount = _.countBy(array, 'author') //{autho1: 2, auhtor2: 1, author3: 5...}

    //return the author name who has the largest number from the obj blogCount:
    const mostBlog = Object.keys(blogCount).reduce((prev, cur) => blogCount[prev] > blogCount[cur] ? prev : cur)
    const max = Math.max(...Object.values(blogCount))
    return { author: mostBlog, blogs: max }
}

//The function returns the author, whose blog posts have the largest amount of likes.
const mostLikes = (array) => {
    const outputArray = _(array)
        .groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes')
        }))
        .value();
    //[{author: "adward", likes: 12}, {author: "philip", likes: 8}]
    const mostLikes = Math.max.apply(Math, outputArray.map(function (o) { return o.likes; }))
    //12
    const mostLikesObj = outputArray.find(item => item.likes === mostLikes)
    return mostLikesObj

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}