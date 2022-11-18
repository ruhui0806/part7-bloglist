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
import blogService from '../services/blogs'
const Blog = ({ blog, addLikes, removeBlog, setBlogs }) => {
    if (!blog) {
        return null
    }

    const [newComment, setNewComment] = useState('')
    const handleCommentChange = ({ target }) => {
        setNewComment(target.value)
    }

    const addNewComment = async (event, id) => {
        event.preventDefault()
        const commentObject = {
            content: newComment,
        }
        console.log('to add comment: ', newComment)
        await blogService.addComment(id, commentObject)
        setNewComment('')
        setBlogs
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
                <form onSubmit={() => addNewComment(event, blog.id)}>
                    <input value={newComment} onChange={handleCommentChange} />
                    <button type="submit">add comment</button>
                </form>
                {blog.comments.map((comment) => (
                    <div key={comment.id}>
                        <li>{comment.content}</li>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
