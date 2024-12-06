import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'

import Header from './components/Header/Header'
import RegisterPanel from './components/Authorization/RegisterPanel/RegisterPanel'
import LoginPanel from './components/Authorization/LoginPanel/LoginPanel'
import HomePage from './components/HomePage/HomePage'


function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
					{/* Публичные роуты */}
					<Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPanel />} />
                    <Route path="/register" element={<RegisterPanel />} />

					{/* Приватные роуты */}
					<Route element={<PrivateRoutes />}>
						<Route path="/user/id/:id" element={<HomePage />} />
					</Route>
                </Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
