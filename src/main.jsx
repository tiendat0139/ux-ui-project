// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GobalStyle from "./components/GlobalStyle"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GobalStyle>
      <App />
    </GobalStyle>
  // </React.StrictMode>,
)
