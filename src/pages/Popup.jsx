import { Box , Heading, Input, Flex, Button, Stack, TagRightIcon } from "@chakra-ui/react"
import { useRef, useContext, useEffect } from "react"
import { saveCityContext } from "../ContextApi/saveCityContext"
import "boxicons"


const Popup = () => {

    const { isOpen, closePopup } = useContext(saveCityContext)
    const { setSavedCity} = useContext(saveCityContext)
    const inputCityRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()

        const cityName = inputCityRef.current.value.trim()

        localStorage.setItem("city", JSON.stringify(cityName))

        inputCityRef.current.value=""
    }

    useEffect(() => {
        const setCity = JSON.parse(localStorage.getItem("city"));
        setSavedCity(setCity)
        console.log("City from localStorage:", setCity);
    })

    return(
        <>
        {isOpen &&
        <Box position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="rgba(0, 0, 0, 0.5)"
            zIndex="9999"
            >

                <Box w={{base:"80%", md:"60%", lg:"40%"}} p={5}  borderRadius={"20px"} boxShadow={""}>
                    <Box 
                    w={"6%"}
                    ml={"auto"}
                    border={"0px solid black"}
                    display="flex"
                    justifyContent="flex-end"
                    bg={"transparent"}
                    cursor="pointer"
                    onClick={closePopup}
                    >
                        <box-icon name='x' color="red" size="30px" style={{textAlign:"center"}}></box-icon>
                    </Box>
                   
                    <Stack spacing={6}>
                        <Heading fontSize={"xx-large"} color={"blackAlpha.600"}>Save City</Heading>
                        <Input
                        type="text"
                        ref={inputCityRef}
                        placeholder="Enter city name"
                        color={"gray"}
                        _placeholder={{color:"gray"}}
                        />
                        <Button onClick={handleSubmit} type="submit" color={"white"} bgColor={"red"} borderRadius={"50px"} _hover={{backgroundColor:"darkred"}}>
                            Save
                        </Button>
                    </Stack>
                </Box>


            </Box>
}
        </>
    )
}

export default Popup;