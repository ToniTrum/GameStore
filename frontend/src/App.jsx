import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'

import Header from './components/Header/Header'
import RegistrationPanel from './components/RegistrationPanel/RegistrationPanel'

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
                    <Route path="/login" element={<div>Login Page</div>} />

                    <Route element={<PrivateRoutes />}>
                        <Route path="/registration" element={<RegistrationPanel />} />
                    </Route>
                </Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
