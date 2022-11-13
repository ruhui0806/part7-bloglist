import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import {
    initializeBlogs,
    setBlogs,
    removeBlog,
    moreLike,
    addNew,
} from './reducers/blogReducer'

const App = () => {
    // const [message, setMessage] = useState(null)
    // const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)
    const [blogVisible, setBlogVisible] = useState(false)

    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const message = useSelector((state) => state.message)

    // useEffect(() => {
    //     blogService.getAll().then((blogs) => setBlogs(blogs))
    // }, [])
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON !== null) {
            console.log('-->', loggedUserJSON)
            const user = JSON.parse(loggedUserJSON)
            console.log('-->', user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })

            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setMessage('Wrong username or password'))
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 100000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const loginForm = () => (
        <>
            <h2>log in to application</h2>
            <div style={{ display: loginVisible ? 'none' : '' }}>
                <button
                    id="click-to-login"
                    onClick={() => setLoginVisible(true)}
                >
                    Click to login
                </button>
            </div>
            <Notification
                message={message}
                style={{
                    color: 'red',
                    borderStyle: 'solid',
                    borderColor: 'red',
                    background: 'lightgray',
                    fontSize: 20,
                }}
            />
            <div style={{ display: loginVisible ? '' : 'none' }}>
                <LoginForm
                    onSubmit={handleLogin}
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </>
    )

    // const addBlog = (blogObject) => {
    //     blogService.createNew(blogObject).then((returnedBlog) => {
    //         setBlogs(blogs.concat(returnedBlog))
    //     })
    // }
    const addBlog = (blogObject) => {
        dispatch(addNew(blogObject))
    }

    const addBlogNotification = (blogObject) => {
        dispatch(
            setMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
        )
        setTimeout(() => {
            dispatch(setMessage(null))
        }, 5000)
    }

    // const updateLikes = (id) => {
    //     const blog = blogs.find((blog) => blog.id === id)
    //     const changedBlog = { ...blog, likes: blog.likes + 1 }
    //     blogService.update(id, changedBlog).then((returnedBlog) => {
    //         setBlogs(
    //             blogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
    //         )
    //     })
    // }
    const updateLikes = (id) => {
        dispatch(moreLike(id))
    }

    // const removeBlogof = (id) => {
    //     const blog = blogs.find((blog) => blog.id === id)
    //     if (window.confirm(`Delete ${blog.title} ?`)) {
    //         blogService
    //             .remove(id)
    //             .then(setBlogs(blogs.filter((blog) => blog.id !== id)))
    //             .then(
    //                 dispatch(
    //                     setMessage(
    //                         `Remove blog ${blog.title} by ${blog.author}`
    //                     )
    //                 )
    //             )
    //         setTimeout(() => {
    //             dispatch(setMessage(null))
    //         }, 5000)
    //     }
    // }

    const removeBlogof = (id) => {
        const blog = blogs.find((blog) => blog.id === id)
        if (window.confirm(`Delete ${blog.title} ?`)) {
            dispatch(removeBlog(id)).then(
                dispatch(
                    setMessage(`Remove blog ${blog.title} by ${blog.author}`)
                )
            )
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
    }

    const SortBlogbyLikes = (a, b) => {
        return b.likes - a.likes
    }

    const BlogsList = () => (
        <>
            <h2>blogs</h2>
            <Notification
                message={message}
                style={{
                    color: 'green',
                    borderStyle: 'solid',
                    borderColor: 'green',
                    background: 'lightgray',
                    fontSize: 20,
                }}
            />
            <h3> {user.name} logged in</h3>
            <button onClick={handleLogout}>log out</button>
            <br />

            <div style={{ display: blogVisible ? 'none' : '' }}>
                <button onClick={() => setBlogVisible(true)}>new blog</button>
            </div>

            <div style={{ display: blogVisible ? '' : 'none' }}>
                <h3>create new</h3>
                <BlogForm
                    handleSubmit={addBlog}
                    handleNotification={addBlogNotification}
                />
                <button onClick={() => setBlogVisible(false)}>Cancel</button>
            </div>

            {[...blogs].sort(SortBlogbyLikes).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLikes={() => updateLikes(blog.id)}
                    removeBlog={() => removeBlogof(blog.id)}
                />
            ))}
        </>
    )

    return (
        <div>
            {user === null && loginForm()}
            {user !== null && BlogsList()}

            <br />
        </div>
    )
}

export default App
