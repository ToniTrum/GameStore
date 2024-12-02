import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const API_URL = 'http://127.0.0.1:8000'


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
