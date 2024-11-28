import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const API_URL = 'http://localhost:8000'
export const API_STATIC_MEDIA = 'http://localhost:8000/'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
