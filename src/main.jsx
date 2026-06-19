import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { Provider } from 'react-redux';
import Store from './Redux/Store.jsx';






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </StrictMode>,
)
