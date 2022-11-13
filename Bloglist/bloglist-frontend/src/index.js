import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { createStore } from 'redux'
// import reducer from './reducers'
// import { rootStore } from './reducers'
import { rootStore } from './root'
import { Provider } from 'react-redux'

// const rootStore = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={rootStore}>
        <App />
    </Provider>
)
