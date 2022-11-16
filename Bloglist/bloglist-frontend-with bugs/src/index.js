import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { rootStore } from './root'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={rootStore}>
        <Router>
            <App />
        </Router>
    </Provider>
)
