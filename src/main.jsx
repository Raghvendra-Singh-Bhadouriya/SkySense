import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from "./ContextApi/searchContext.jsx";
import { LoadingProvider } from "./ContextApi/loadingContext.jsx";
import { SaveCityProvider } from "./ContextApi/saveCityContext.jsx";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set "dark" for dark mode
    useSystemColorMode: false, // Disable automatic system detection
  },
});


createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <SearchProvider>
      <SaveCityProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </SaveCityProvider>
    </SearchProvider>
  </ChakraProvider>,
)
