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
const Blog = ({ blog, addLikes, removeBlog, setBlogs, login }) => {
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
            <h3>Title: {blog.title}</h3>

            <h4> URL: {blog.url}</h4>
            <div>
                Likes: {blog.likes}{' '}
                <button
                    id="like-button"
                    onClick={addLikes}
                    className="btn btn-primary"
                >
                    like
                </button>
                <button
                    id="delete-button"
                    onClick={removeBlog}
                    className="btn btn-danger"
                >
                    Remove
                </button>
                <Link
                    id="back-button"
                    className="btn btn-light d-inline ms-auto"
                    to="/"
                >
                    Back
                </Link>
            </div>
            <p>Added by {login.name}</p>
            <div>
                <h3>Comments</h3>
                <form onSubmit={() => addNewComment(event, blog.id)}>
                    <input value={newComment} onChange={handleCommentChange} />
                    <button type="submit">Add comment</button>
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
