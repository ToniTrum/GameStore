import {Outlet} from "react-router-dom"

import useFetchCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"

const MainPage = () => {
    const { userCountry, countryCurrency, error, loading } = useFetchCountryAndCurrency()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <main>
            <Outlet />
        </main>
    )
}

export default MainPage