import {Outlet} from "react-router-dom"

import useFetchCountry from "../../utils/useFetchCountry"

const MainPage = () => {
    const { userCountry, error, loading } = useFetchCountry()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <main>
            <Outlet />
        </main>
    )
}

export default MainPage