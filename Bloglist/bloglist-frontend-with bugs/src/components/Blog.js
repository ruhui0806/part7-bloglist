import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const Blog = ({ blog, addLikes, removeBlog }) => {
    if (!blog) {
        return null
    }
    return (
        <div>
            <h3> {blog.title}</h3>

            <div>{blog.url}</div>
            <div>
                {blog.likes}{' '}
                <button id="like-button" onClick={addLikes}>
                    like
                </button>
                <button id="delete-button" onClick={removeBlog}>
                    Remove
                </button>
            </div>
            <p>added by username</p>
            <div>
                <h3>comments</h3>
                <ul>
                    <li>comments to be installed</li>
                </ul>
            </div>
        </div>
    )
}

export default Blog
