import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'
import StartRoute from './utils/StartRoute'

import Header from './components/Header/Header'
import RegisterPanel from './components/Authorization/RegisterPanel/RegisterPanel'
import LoginPanel from './components/Authorization/LoginPanel/LoginPanel'
import MainPage from './components/MainPage/MainPage'
import HomePage from './components/HomePage/HomePage'
import Profile from './components/Profile/Profile'
import ChangePanel from './components/ChangePanel/ChangePanel'


function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
					{/* Публичные роуты */}
					<Route path="/" element={<StartRoute />} />
                    <Route path="/login" element={<LoginPanel />} />
                    <Route path="/register" element={<RegisterPanel />} />

					{/* Приватные роуты */}
					<Route element={<PrivateRoutes />}>
						<Route path="/user/id/:id" element={<MainPage />}>
							<Route index element={<HomePage />} />
							<Route path="profile" element={<Profile />} />
							<Route path="change" element={<ChangePanel />} />
						</Route>
					</Route>
                </Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
