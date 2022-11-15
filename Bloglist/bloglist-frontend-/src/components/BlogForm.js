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
            <div>
                Title:{' '}
                <input
                    id="input-title"
                    data-testid="title"
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                />{' '}
            </div>
            <br />
            <div>
                Author:{' '}
                <input
                    id="input-author"
                    data-testid="author"
                    value={newAuthor}
                    onChange={({ target }) => setNewAuthor(target.value)}
                />{' '}
            </div>
            <br />
            <div>
                Url:{' '}
                <input
                    id="input-url"
                    data-testid="url"
                    value={newUrl}
                    onChange={({ target }) => setNewUrl(target.value)}
                />{' '}
            </div>
            <br />
            <button id="create-blog" type="submit">
                {' '}
                Create new blog{' '}
            </button>
        </form>
    )
}

export default BlogForm
