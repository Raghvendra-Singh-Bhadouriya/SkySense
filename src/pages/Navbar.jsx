import { Image, Flex, Box, Text, Input, Button } from "@chakra-ui/react"
import { useRef, useContext } from "react"
import { searchContext } from "../ContextApi/searchContext";
import { saveCityContext } from "../ContextApi/saveCityContext";



const Navbar = () => {
    
    const searchRef = useRef();
    const { setSearch } = useContext(searchContext)
    const { openPopup } = useContext(saveCityContext)

    // const colorMap = {
    //     Sunny: "yellow.400",
    //     Clear: "#FFD700",
    //     Cloudy: "#778899",
    //     Rainy: "#87CEFA",
    //     Stormy: "gray.700",
    //     Snowy: "whiteAlpha.800",
    //     Snow: "#F0FFFF",
    //     Haze: "#A89F91",
    //     Thunderstorm: "#6A5ACD",
    //     Fog: "#C0C0C0",
    //     Mist: "#B0C4DE",
    //     Hot: "#FF4500",
    //     Windy: "#00CED1",
    //     Sunrise: "#FFA07A",
    //     Sunset: "#FFA07A",
    //     Night: "#2C3E50"
    //   };


    function handleChange(){
        setSearch(searchRef.current.value)
    }


    return(
        <>
        <Box border={"0px solid black"} w={"100%"} position={"fixed"} top={0} zIndex={"9999999"}
        backdropFilter="blur(10px)"
        bgGradient="linear(to-r, #0f2027, #203a43, #2c5364)"
        boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}
        >
            <Flex w={"100%"} border={"0px solid black"} justifyContent={"space-around"} bg={"transparent"}>
                <Flex m={"auto"}  w={{base:"25%" ,md:"18%", lg:"10%"}} bg={"transparent"} justifyContent={"space-around"} border={"0px solid black"}>
                    <Box m={"auto"} border={"0px solid black"} w={{base:"25%", md:"20%",lg:"25%" }} bg={"transparent"}>
                        <Image w={"100%"}  bg={"transparent"} src={"/sunny.png"}  alt="sunny Logo"/>
                    </Box>
                    <Text
                        m={"auto"}
                        bg={"transparent"}
                        fontSize={{base:"md", md:"2xl", lg:"2xl"}}
                        fontWeight={"bold"}
                        color={"rgb(7,85,152)"}
                        textDecoration={"underline"}
                        border={"0px solid black"}
                    >
                    SkySense
                    </Text>
                </Flex>
                
                {/* <Text
                m={"auto"}
               
                bg={"transparent"}
                fontSize={{base:"md", md:"2xl", lg:"3xl"}}
                fontWeight={"bold"}
                color={"gold"}
                textDecoration={"underline"}
                border={"0px solid black"}
                >
                    Weather<span style={{color:"red", background:"transparent"}}>web</span>
                </Text> */}
                <Input
                ref={searchRef}
                onChange={handleChange}
                placeholder="Search by city name"
                _placeholder={{color:"gray", fontSize:{base:"10px", md:"md", lg:"md"}}}
                m={"auto"}
                h={{base:"25px", md:"35px", lg:"40px"}}
                w={{base:"35%", md:"40%", lg:"40%"}}
                fontSize={{base:"sm", lg:"md"}}
                />
                <Button onClick={openPopup}
                w={{base:"20%", md:"15%", lg:"10%"}}
                m={"auto"}
                mt={{base:"3%", md:"2%", lg:"1%"}}
                mb={{base:"3%", md:"2%", lg:"1%"}}
                h={{base:"25px", md:"35px", lg:"40px"}}
                fontSize={{base:"x-small", md:"md", lg:"md"}}
                color={"white"}
                bgColor={"red"}
                _hover={{bgColor:"darkred"}}
                >
                    Save City
                </Button>
            </Flex>
        </Box>
        </>   
    )
}

export default Navbar;