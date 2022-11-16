import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Blog from './components/Blog'
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
import { setUser, logOut, loggedUser, loginUser } from './reducers/loginReducer'
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
import { setUsers, initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import Users from './components/Users'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginVisible, setLoginVisible] = useState(false)
    const [blogVisible, setBlogVisible] = useState(false)
    const [style, setStyle] = useState(null)

    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const message = useSelector((state) => state.message)
    const login = useSelector((state) => state.login)
    const usersList = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        dispatch(loggedUser())
    }, [dispatch])

    const styleRed = {
        color: 'red',
        borderStyle: 'solid',
        borderColor: 'red',
        background: 'lightgray',
        fontSize: 20,
    }
    const styleGreen = {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        background: 'lightgray',
        fontSize: 20,
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(loginUser({ username, password }))
            setUsername('')
            setPassword('')
            setStyle(styleGreen)
            dispatch(setMessage('successfully'))
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        } catch (exception) {
            dispatch(setMessage('Wrong username or password'))
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
    }

    const handleLogout = () => {
        dispatch(logOut())
        window.localStorage.removeItem('loggedBlogappUser')
    }

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

    const updateLikes = (id) => {
        dispatch(moreLike(id))
    }

    const removeBlogof = (id) => {
        const blog = blogs.find((blog) => blog.id === id)
        if (window.confirm(`Delete ${blog.title} ?`)) {
            dispatch(removeBlog(id)).then(
                dispatch(
                    setMessage(`Remove blog ${blog.title} by ${blog.author}`)
                )
            )
            setStyle(styleGreen)
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
    }

    const SortBlogbyLikes = (a, b) => {
        return b.likes - a.likes
    }
    const LoginForms = () => (
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
            <Notification message={message} style={style} />
            <div style={{ display: loginVisible ? '' : 'none' }}>
                <LoginForm
                    onSubmit={handleLogin}
                    username={username}
                    password={password}
                    handleUsernameChange={(event) =>
                        setUsername(event.target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </>
    )
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    const BlogsList = () => (
        <div>
            <Notification message={message} style={style} />

            {/* <button onClick={handleLogout}>log out</button> */}
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
                <div key={blog.id} style={blogStyle}>
                    <div>
                        {' '}
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    )

    const matchU = useMatch('/users/:id')

    const matchedUser = matchU
        ? usersList.find(
              (matchedUser) =>
                  String(matchedUser.id) === String(matchU.params.id)
          )
        : null
    // console.log(usersList)
    // console.log(matchedUser)

    const matchB = useMatch('/blogs/:id')
    const matchedBlog = matchB
        ? blogs.find(
              (matchedBlog) =>
                  String(matchedBlog.id) === String(matchB.params.id)
          )
        : null

    return (
        <div>
            <h3>blogs</h3>
            <div>
                <Link to="/users"> Users</Link>
                <i> </i>
                <Link to="/"> Blogs</Link>
                {login ? (
                    <em>
                        {' '}
                        {login.name} logged in
                        <button onClick={handleLogout}>log out</button>
                    </em>
                ) : null}
            </div>
            <Routes>
                <Route
                    path="/users"
                    element={
                        <Users
                            login={login}
                            handleLogout={handleLogout}
                            usersList={usersList}
                        />
                    }
                />
                <Route
                    path="/users/:id"
                    element={<User user={matchedUser} />}
                />
                <Route
                    path="/blogs/:id"
                    element={
                        matchedBlog ? (
                            <Blog
                                blog={matchedBlog}
                                addLikes={() => updateLikes(matchedBlog.id)}
                                removeBlog={() => removeBlogof(matchedBlog.id)}
                            />
                        ) : (
                            <Navigate replace to="/" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={login === null ? LoginForms() : BlogsList()}
                />
            </Routes>
        </div>
    )
}

export default App
