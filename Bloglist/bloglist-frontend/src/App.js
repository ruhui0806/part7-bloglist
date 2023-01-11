import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setMessage } from './reducers/notificationReducer'
import { BsPeopleFill } from 'react-icons/bs'
import { IoMdDocument } from 'react-icons/io'
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
import loginService from './services/login'
import blogService from './services/blogs'

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
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
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
            const user = await loginService.login({
                username,
                password,
            })

            dispatch(setUser(user))
            blogService.setToken(user.token)

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            setUsername('')
            setPassword('')
            setStyle(styleGreen)
            dispatch(setMessage(`${user.username} logged in successfully`))

            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        } catch (error) {
            setStyle(styleRed)

            dispatch(setMessage('Wrong username or password'))
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
        console.log(login)
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

    const matchU = useMatch('/users/:id')

    const matchedUser = matchU
        ? usersList.find(
              (matchedUser) =>
                  String(matchedUser.id) === String(matchU.params.id)
          )
        : null

    const matchB = useMatch('/blogs/:id')
    const matchedBlog = matchB
        ? blogs.find(
              (matchedBlog) =>
                  String(matchedBlog.id) === String(matchB.params.id)
          )
        : null

    return (
        <div className="container">
            <nav className="navbar mb-4 p-0 d-flex justify-content-center">
                <img src={logo} alt="logo" className="mr-2 navbar-brand" />
            </nav>
            <div className="d-flex gap-3 mb-4">
                <Link
                    to="/users"
                    className="btn btn-primary p1-1 d-flex align-items-center"
                >
                    <BsPeopleFill className="icon m-1" /> Users
                </Link>
                <i> </i>
                <Link
                    to="/"
                    className="btn btn-primary d-flex align-items-center"
                >
                    <IoMdDocument className="icon m-1" />
                    Blogs
                </Link>
                <div className="d-inline ms-auto">
                    {login ? (
                        <em>
                            {' '}
                            {login.name} logged in{' '}
                            <Button onClick={handleLogout}>Log out</Button>
                        </em>
                    ) : null}
                </div>
            </div>
            <hr />
            <Routes>
                <Route
                    path="/users"
                    element={
                        login ? (
                            <Users
                                login={login}
                                handleLogout={handleLogout}
                                usersList={usersList}
                            />
                        ) : (
                            <Navigate replace to="/" />
                        )
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
                                setBlogs={dispatch(initializeBlogs())}
                            />
                        ) : (
                            <Navigate replace to="/" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        login === null ? (
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
                                loginVisible={loginVisible}
                                setLoginVisible={setLoginVisible}
                                message={message}
                                style={style}
                            />
                        ) : (
                            <BlogList
                                message={message}
                                style={style}
                                blogVisible={blogVisible}
                                setBlogVisible={setBlogVisible}
                                addBlog={addBlog}
                                addBlogNotification={addBlogNotification}
                                SortBlogbyLikes={SortBlogbyLikes}
                                blogStyle={blogStyle}
                                blogs={blogs}
                                loginUser={login.name}
                            />
                        )
                    }
                />
            </Routes>
        </div>
    )
}

export default App
