import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const [showDetail, setShowDetail] = useState(false)
    const toggleDetailsVisibility = () => {
        setShowDetail(!showDetail)
    }
    const DetailBlog = () => {
        return (
            <div
                style={{ display: showDetail ? '' : 'none' }}
                className="fullBlog"
            >
                <i>Url: </i>
                {blog.url}
                <br />
                <i>Likes: </i>
                {blog.likes}{' '}
                <button id="like-button" onClick={addLikes}>
                    like
                </button>
                <br />
                <button id="delete-button" onClick={removeBlog}>
                    Remove
                </button>
            </div>
        )
    }
    return (
        <div style={blogStyle} className="blog">
            <div className="halfBlog">
                <i>Title: </i> {blog.title}{' '}
                <button id="view-button" onClick={toggleDetailsVisibility}>
                    view
                </button>
                <br />
                <i>Author: </i>
                {blog.author}
            </div>
            <DetailBlog />
        </div>
    )
}
Blog.propTypes = {
    removeBlog: PropTypes.func.isRequired,
    addLikes: PropTypes.func.isRequired,
}

export default Blog
