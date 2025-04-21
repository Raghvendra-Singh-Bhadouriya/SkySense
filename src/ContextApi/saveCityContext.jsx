import { useState, createContext } from "react"
import { useDisclosure } from "@chakra-ui/react"

export const saveCityContext = createContext()

export const SaveCityProvider = ({children}) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ savedCity, setSavedCity ] = useState(false)

    const openPopup = () => {
        setIsOpen(true)
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    return(
        <saveCityContext.Provider value={{ isOpen, openPopup, closePopup, savedCity, setSavedCity }}>
            {children}
        </saveCityContext.Provider>
    )
    
}