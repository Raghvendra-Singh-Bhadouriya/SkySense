import { Box, Text, Spinner } from "@chakra-ui/react"
 
const Loading = () => {
    return(
        <>
        <Box w={{base:"30%", md:"50%", lg:"10%"}} m={"auto"} mt={{base:"60%", md:"50%", lg:"20%"}} border={"0px solid black"} textAlign={"center"} >
            <Spinner
                fontSize={{base:"2xl", md:"4xl", lg:"md"}}
                color="#2196f3"
                css={{ "--spinner-track-color": "colors.gray.200" }}
                bg={"transparent"}
            />
            <Text fontSize={{base:"md", md:"xl", lg:"md"}} color={"#2196f3"} bg={"transparent"}>Loading...</Text>
        </Box>
        </>
    )
}

export default Loading;