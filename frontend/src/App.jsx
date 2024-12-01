import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'

import Header from './components/Header/Header'
import RegisterPanel from './components/Authorization/RegisterPanel/RegisterPanel'
import LoginPanel from './components/Authorization/LoginPanel/LoginPanel'


function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
                    <Route path="/login" element={<LoginPanel />} />

                    <Route element={<PrivateRoutes />}>
                        <Route path="/register" element={<RegisterPanel />} />
                    </Route>
                </Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
