import { Box, Text, Heading, Flex, Grid, GridItem, Card, CardBody, Stack } from "@chakra-ui/react"
import { useState, useEffect, useContext } from "react";
import "boxicons"
import { searchContext } from "../ContextApi/searchContext";
import Loading from "./Loading";
import { loadingContext } from "../ContextApi/loadingContext";
import Popup from "./Popup";
import { saveCityContext } from "../ContextApi/saveCityContext";


const HomePage = () => {

    const [ weatherData, setWeatherData] = useState({})
    const { search } = useContext(searchContext)
    const { loading, setLoading } = useContext(loadingContext);
    const { savedCity } = useContext(saveCityContext)


    let city = search || savedCity


    async function fetchWeatherData(city){
        setLoading(true)
        try {
            let res = await fetch(`https://wttr.in/${city}?format=j1`);
            let data = await res.json();
            setWeatherData(data || <Loading/>);
        } catch (error) {
            console.log("Error in fetching data", error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeatherData(city)
    }, [city])


    let uvRay = weatherData?.current_condition?.[0]?.uvIndex
    let uvRaysLevel;

    if(uvRay <= 2){
       uvRaysLevel = "Very Low"
    }else if(uvRay >= 3 && uvRay <= 5){
        uvRaysLevel = "Moderate"
    }else if(uvRay >= 6 && uvRay <= 7){
        uvRaysLevel = "High"
    }else if(uvRay >= 8 && uvRay <= 10){
        uvRaysLevel = "Very High"
    }else if(uvRay >= 11){
        uvRaysLevel = "Extreme"
    }


    //const condition = weatherData?.current_condition?.[0]?.weatherDesc?.[0]?.value;
    //setNavbgColor(condition)
    // const bgMap = {
    //     Sunny: "https://images.unsplash.com/photo-1547899818-c3159263dd1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bm55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D",
    //     Haze: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5oCK5vI3c-uIqSeuwcl9G-ScHF9NP5ZCMmQ&s"
        
    // }

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

    return(
        <>
        
        {loading ?   (<Loading/>) : (
        <Box
            backgroundSize="cover"
            backgroundPosition="center"
            width="100%"
            //bgColor={colorMap[condition] || "gray.200"}
            //backgroundImage={`url(${bgMap[condition]})`}
            bgGradient="linear(to-br,rgb(3, 39, 54),rgb(3, 57, 75),rgb(38, 74, 90))"
            mt={{base:"10%", md:"6%", lg:"4%"}}
            backgroundRepeat="no-repeat"
            position="absolute"
            border={"0px solid red"}
        >
            <Popup/>
            <Box  
            bg={"transparent"} 
            border={"0px solid black"}
            pt={"5%"}
            pb={"5%"}  
            w={"100%"}
            >
                
                <Box border={"0px solid black"} bg={"transparent"} w={{base:"90%", md:"85%", lg:"80%"}} m={"auto"}>
                    <Text bg={"transparent"} fontWeight={"bold"} fontSize={{base:"10px", md:"md", lg:"lg"}}>
                        {(search || savedCity || "").toUpperCase()}
                    </Text>
                    <Heading bg={"transparent"} fontSize={{base:"md", md:"2xl", lg:"4xl"}}>
                        {weatherData?.nearest_area?.[0]?.areaName?.[0]?.value}
                    </Heading>
                    <Flex w={"100%"} bg={"transparent"} border={"0px solid black"}>
                        <Text 
                            bg={"transparent"}
                            fontSize={{base:"5xl", md:"7xl", lg:"8xl"}}
                            fontWeight={"bold"}
                            border={"0px solid black"}
                        >
                            {weatherData?.current_condition?.[0]?.temp_C || "--"}°
                        </Text>
                        <Text 
                            bg={"transparent"}
                            fontSize={{base:"sm", md:"xl", lg:"2xl"}}
                            fontWeight={"bold"}
                            border={"0px solid black"}
                            mt={{base:"15%", md:"10%", lg:"8%"}}
                        >
                            {weatherData?.current_condition?.[0]?.weatherDesc[0]?.value}
                        </Text>
                    </Flex>

                    {/* =================== Sun, Moon Rise and Set Time =================== */}
                    <Grid mt={"5%"} border={"0px solid black"} templateColumns={{base:"repeat(1, 1fr)", md:"repeat(1, 1fr)" ,lg:"repeat(2, 1fr)"}} rowGap={{base:5}} bg={"transparent"} columnGap={"10%"}>
                        <Flex border={"0px solid black"} justifyContent={"space-around"} bg={"transparent"} backdropFilter="blur(10px)" borderRadius={"50px"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <Text m={"auto"}  bg={"transparent"} fontSize={{base:"small", md:"md", lg:"xl"}} fontWeight={"bold"}>Sunrise {weatherData?.weather?.[0]?.astronomy[0]?.sunrise}</Text>
                            <box-icon name='sun' color="white" style={{background:"transparent"}}></box-icon>
                            <Text m={"auto"}  bg={"transparent"} fontSize={{base:"small", md:"md", lg:"xl"}} fontWeight={"bold"}>Sunset {weatherData?.weather?.[0]?.astronomy[0]?.sunset}</Text>
                        </Flex>
                        <Flex border={"0px solid black"} justifyContent={"space-around"} bg={"transparent"} backdropFilter="blur(10px)" borderRadius={"50px"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <Text m={"auto"} bg={"transparent"} fontSize={{base:"small", md:"md", lg:"xl"}} fontWeight={"bold"}>Moonrise {weatherData?.weather?.[0]?.astronomy[0]?.moonrise}</Text>
                            <box-icon name='moon' color="white" style={{background:"transparent"}}></box-icon>
                            <Text m={"auto"}  bg={"transparent"} fontSize={{base:"small", md:"md", lg:"xl"}} fontWeight={"bold"}>Moonset {weatherData?.weather?.[0]?.astronomy[0]?.moonset}</Text>
                        </Flex>
                    </Grid>

                    <Stack spacing={{base:"10", md:"14", lg:"20"}} mt={{base:"10", md:"14", lg:"20"}} bg={"transparent"}>
                    <Grid
                    border={"0px solid black"} 
                    bg={"transparent"} 
                    gridTemplateColumns={{base:"repeat(2,1fr)", lg:"repeat(5,1fr)"}} 
                    rowGap={{base:4, md:6, lg:10}}
                    //mt={20} 
                    textAlign={"center"} 
                    >
                        <GridItem m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon name="thermometer" type="solid" color="white" size={{base:"x-small", md:"100%", lg:"120%"}} style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>Feels like</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>{weatherData?.current_condition?.[0]?.FeelsLikeC} °</Text>
                        </GridItem>
                        <GridItem m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon name="droplet-half" color="white" type="solid" size={{base:"x-small", md:"100%", lg:"120%"}} style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>Humidity</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>
                                {weatherData?.current_condition?.[0]?.humidity}<span style={{fontSize:"14px", background:"transparent"}}> %</span>
                            </Text>
                        </GridItem>
                        <GridItem m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon name="sun" color="white" size={{base:"10px", md:"100%", lg:"120%"}} style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>UV</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>
                                {weatherData?.current_condition?.[0]?.uvIndex}<span style={{fontSize:"14px", background:"transparent"}}> {uvRaysLevel}</span>
                            </Text>
                        </GridItem>
                        <GridItem m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon name='low-vision' color="white" size={{base:"xx-small", md:"100%", lg:"120%"}}  style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>Visibility</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>{weatherData?.current_condition?.[0]?.visibility}<span style={{fontSize:"14px", background:"transparent"}}> km</span></Text>
                        </GridItem>
                        <GridItem m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon name='wind' color="white" size={{base:"10px", md:"100%", lg:"120%"}}  style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>WindSpeed</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>{weatherData?.current_condition?.[0]?.windspeedKmph}<span style={{fontSize:"14px", background:"transparent"}}> km/h</span></Text>
                        </GridItem>
                        <GridItem gridColumn={{ base: "auto", lg: "3 / span 1" }} gridRow="2" m={"auto"} p={"10px"} backdropFilter="blur(10px)" w={{base:"60%", md:"70%", lg:"80%"}} borderRadius={"20px"} bg={"transparent"} boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}>
                            <box-icon type='solid' name='dashboard' color="white" size={{base:"10px", md:"100%", lg:"120%"}}  style={{background:"transparent"}}></box-icon>
                            <Text bg={"transparent"} color={"gray"} fontSize={{base:"10px", md:"15px", lg:"md"}} fontWeight={"medium"}>Air pressure</Text>
                            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight={"bold"} bg={"transparent"}>{weatherData?.current_condition?.[0]?.pressure}<span style={{fontSize:"14px", background:"transparent"}}> hPa</span></Text>
                        </GridItem>
                    </Grid>

                    <Grid 
                    border={"0px solid black"}
                    //mt={"5%"}
                    gridTemplateColumns={{base:"repeat(1,1fr)", md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)"}}
                    rowGap={{base:5}}
                    bg={"transparent"}
                    >
                        {Array.isArray(weatherData.weather) && weatherData.weather.map((dayWeather) => {
                            return(
                                <>
                                <Card
                                w={{base:"90%", md:"85%", lg:"80%"}}
                                m={"auto"}
                                bg={"transparent"}
                                borderRadius={"25px"}
                                backdropFilter="blur(10px)"
                                boxShadow={"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}
                                >
                                    <CardBody bg={"transparent"}>
                                      <Stack spacing={5} bg={"transparent"}>
                                        <Text mb={2} textAlign={"center"} color={"lightgray"} fontSize={{base:"sm", md:"sm", lg:"sm"}} fontWeight={"medium"}  bg={"transparent"} textDecorationLine={"underline"}>
                                            {dayWeather?.date}
                                        </Text>

                                        {dayWeather.astronomy.map((day) => {
                                            return(
                                                <>
                                                    <Flex bg={"transparent"} justifyContent={"space-between"}>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} fontWeight={"bold"} bg={"transparent"}>SunRise:</Text>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>{day.sunrise}</Text>
                                                    </Flex>
                                                    <Flex bg={"transparent"} justifyContent={"space-between"}>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} fontWeight={"bold"} bg={"transparent"}>SunSet:</Text>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>{day.sunset}</Text>
                                                    </Flex>
                                                    <Flex bg={"transparent"} justifyContent={"space-between"}>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} fontWeight={"bold"} bg={"transparent"}>MoonRise:</Text>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>{day.moonrise}</Text>
                                                    </Flex>
                                                    <Flex bg={"transparent"} justifyContent={"space-between"}>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} fontWeight={"bold"} bg={"transparent"}>MoonSet:</Text>
                                                        <Text fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>{day.moonset}</Text>
                                                    </Flex>
                                                </>
                                            )
                                        })}
                                        <Flex bg={"transparent"} justifyContent={"space-between"}>
                                            <Text fontWeight={"bold"} fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>AvgTemp:</Text>
                                            <Text fontSize={{base:"sm", md:"md", lg:"md"}} bg={"transparent"}>{dayWeather.avgtempC}°</Text>
                                        </Flex>
                                      </Stack>
                                    </CardBody>
                                </Card>
                                </>
                            )
                        })}
                    </Grid>

                    
                    <Box
                        p={5}
                        borderRadius="20px"
                        backdropFilter="blur(10px)"
                        boxShadow="rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, 
                        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
                        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
                        rgba(0, 0, 0, 0.06) 0px 2px 1px, 
                        rgba(0, 0, 0, 0.09) 0px 4px 2px, 
                        rgba(0, 0, 0, 0.09) 0px 8px 4px, 
                        rgba(0, 0, 0, 0.09) 0px 16px 8px, 
                        rgba(0, 0, 0, 0.09) 0px 32px 16px"
                        bg={"transparent"}
                    >
                    {/* Table Header */}
                        <Grid
                            templateColumns={{ base: "repeat(4, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(4, 1fr)" }}
                            gap={4}
                            textAlign="center"
                            fontWeight="bold"
                            mb={4}
                            bg={"transparent"}
                        >
                            <Text bg={"transparent"}>UV Index</Text>
                            <Text bg={"transparent"}>Risk Level</Text>
                            <Text bg={"transparent"}>Meaning</Text>
                            <Text bg={"transparent"}>Suggestions</Text>
                        </Grid>

                        {/* Data Rows */}
                        {[
                            { index: "0 - 2", risk: "Very Low", color: "green", meaning: "Safe for most people", suggestion: "No protection needed" },
                            { index: "3 - 5", risk: "Moderate", color: "yellow.500", meaning: "Some risk", suggestion: "Sunglasses, SPF if out long" },
                            { index: "6 - 7", risk: "High", color: "orange", meaning: "Risk of harm", suggestion: "SPF 30+, cover skin, avoid midday" },
                            { index: "8 - 10", risk: "Very High", color: "red", meaning: "Serious risk", suggestion: "Shade, SPF 50+, hat & glasses" },
                            { index: "11+", risk: "Extreme", color: "purple", meaning: "Extreme danger", suggestion: "Avoid sun, full protection" },
                        ].map((item, index) => (
                            <Grid
                                key={index}
                                templateColumns={{ base: "repeat(4, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(4, 1fr)" }}
                                gap={4}
                                textAlign="center"
                                bg={"transparent"}
                                py={2}
                                borderTop="1px solid black"
                            >
                                <Text fontSize={{base:"auto", md:"auto", lg:"auto"}} bg={"transparent"}>{item.index}</Text>
                                <Text fontSize={{base:"auto", md:"auto", lg:"auto"}} bg={"transparent"} color={item.color}>{item.risk}</Text>
                                <Text fontSize={{base:"auto", md:"auto", lg:"auto"}} bg={"transparent"}>{item.meaning}</Text>
                                <Text fontSize={{base:"auto", md:"auto", lg:"auto"}} bg={"transparent"}>{item.suggestion}</Text>
                            </Grid>
                        ))}
                    </Box>
                    </Stack>
                </Box>
            </Box>

        </Box>
        )}
        </>
    )
}

export default HomePage;