import { createContext, useContext } from "react";

const CountryAndCurrencyContext = createContext()

export const CountryAndCurrencyProvider = ({ value, children }) => {
    return (
        <CountryAndCurrencyContext.Provider value={value}>
            {children}
        </CountryAndCurrencyContext.Provider>
    )
}

export const useCountryAndCurrency = () => useContext(CountryAndCurrencyContext)
