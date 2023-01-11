import React, { useState } from 'react'

const BlogForm = ({ handleSubmit, handleNotification }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // const [notification, setNotification] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault()

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
        }

        handleSubmit(blogObject)
        handleNotification(blogObject)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <form onSubmit={onSubmit}>
            {/* <h3>Create new</h3> */}
            <h5 className="modal-title" id="addClientModalLabel">
                Create New Blog
            </h5>
            <br />
            <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    id="input-title"
                    data-testid="title"
                    type="text"
                    className="form-control"
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                />{' '}
            </div>
            <br />
            <div>
                <label className="form-label">Author:</label>
                <input
                    id="input-author"
                    data-testid="author"
                    type="text"
                    className="form-control"
                    value={newAuthor}
                    onChange={({ target }) => setNewAuthor(target.value)}
                />{' '}
            </div>
            <br />
            <div>
                <label className="form-label">Url:</label>
                <input
                    id="input-url"
                    data-testid="url"
                    type="text"
                    className="form-control"
                    value={newUrl}
                    onChange={({ target }) => setNewUrl(target.value)}
                />{' '}
            </div>
            <br />
            <button id="create-blog" type="submit" className="btn btn-primary">
                {' '}
                Create new blog{' '}
            </button>
        </form>
    )
}

export default BlogForm
