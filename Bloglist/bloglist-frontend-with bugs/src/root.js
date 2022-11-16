import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import { notificationReducer } from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

export const rootStore = configureStore(
    {
        reducer: {
            blogs: blogReducer,
            message: notificationReducer,
            login: loginReducer,
            users: usersReducer,
        },
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
