import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js/pure"

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
import StorePage from './components/StorePage/StorePage'
import GamePage from './components/GamePage/GamePage'
import PaymentForm from './components/PaymentForm/PaymentForm'

const stripePromise = loadStripe('pk_test_51QaWj8L7bbq6rfGO6je7d1LFWRQH3VqyC0G6sRVYCr09trrFRUlaou2O6d9n5eVZ0XAJLl96ERh4Mrg9OHPobcM900n1tpx8pU')

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
							<Route path="store/page/:pageNumber" element={<StorePage />} />
							<Route path="game/id/:game_id" element={<GamePage />} />
							<Route path="payment" element={
								<Elements stripe={stripePromise}>
									<PaymentForm />
								</Elements>
							} />
						</Route>
					</Route>
                </Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
