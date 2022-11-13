// import { createStore } from 'redux'
// import { combinedReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import { notificationReducer } from './reducers/notificationReducer'

export const rootStore = configureStore(
    {
        reducer: {
            blogs: blogReducer,
            message: notificationReducer,
        },
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
