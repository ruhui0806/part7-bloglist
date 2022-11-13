import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { rootStore } from './root'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={rootStore}>
        <App />
    </Provider>
)
