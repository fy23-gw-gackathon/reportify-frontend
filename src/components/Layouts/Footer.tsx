import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")} className={"w-full"}>
            <Box borderTopWidth={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")}>
                <Container
                    as={Stack}
                    maxW={"6xl"}
                    py={4}
                    direction={{ base: "column", md: "row" }}
                    spacing={4}
                    justify={{ md: "space-between" }}
                    align={{ md: "center" }}
                >
                    <Text>© 2023 Gackathon. All rights reserved</Text>
                </Container>
            </Box>
        </Box>
    );
};
