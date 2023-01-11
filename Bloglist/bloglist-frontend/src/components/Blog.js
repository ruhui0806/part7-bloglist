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
            <p>Title: {blog.title}</p>
            <p> URL: {blog.url}</p>
            <div>
                Likes: {blog.likes}{' '}
                <button
                    id="like-button"
                    onClick={addLikes}
                    className="btn btn-primary me-2 ms-4"
                >
                    like
                </button>
                <button
                    id="delete-button"
                    onClick={removeBlog}
                    className="btn btn-danger me-2"
                >
                    Remove
                </button>
            </div>
            <p>Added by {blog.author}</p>

            <div className="my-4">
                <h3>Comments</h3>
                <form
                    onSubmit={() => addNewComment(event, blog.id)}
                    className=" d-flex-center"
                >
                    <input
                        value={newComment}
                        onChange={handleCommentChange}
                        className="me-4"
                    />
                    <button type="submit" className="btn btn-primary">
                        Add comment
                    </button>
                </form>
                {blog.comments.map((comment) => (
                    <div key={comment.id} className="mx-2">
                        <li>{comment.content}</li>
                    </div>
                ))}
            </div>
            <Link
                id="back-button"
                className="btn btn-primary d-inline ms-auto mt-4"
                to="/"
            >
                Back
            </Link>
        </div>
    )
}

export default Blog
