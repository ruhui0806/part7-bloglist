import React from 'react'
import Notification from './Notification'
import { Button } from 'react-bootstrap'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { FaList } from 'react-icons/fa'
const BlogList = ({
    message,
    style,
    blogVisible,
    setBlogVisible,
    addBlog,
    addBlogNotification,
    SortBlogbyLikes,
    blogStyle,
    blogs,
}) => (
    <div>
        <Notification message={message} style={style} />

        <br />
        <div style={{ display: blogVisible ? 'none' : '' }}>
            <Button
                onClick={() => setBlogVisible(true)}
                className="d-flex align-items-center"
            >
                <FaList className="icon m-1" /> New blog
            </Button>
        </div>

        <div style={{ display: blogVisible ? '' : 'none' }}>
            <BlogForm
                handleSubmit={addBlog}
                handleNotification={addBlogNotification}
            />
            <br />
            <Button
                onClick={() => setBlogVisible(false)}
                className="btn btn-secondary"
            >
                Cancel
            </Button>
        </div>
        <br />
        <table className="table table-hover mt-3">
            <tbody>
                {[...blogs].sort(SortBlogbyLikes).map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            {' '}
                            <Link
                                className="page-link "
                                to={`/blogs/${blog.id}`}
                            >
                                {blog.title}
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default BlogList
