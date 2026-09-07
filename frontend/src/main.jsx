import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import store and persistor from your store.js file
import { store, persistor } from './redux/store.js'

// 2. Import Provider and PersistGate
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap everything with Provider and pass in the store */}
    <Provider store={store}>
      {/* Wrap with PersistGate so saved local data loads before the UI renders */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)