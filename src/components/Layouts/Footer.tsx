import { Container, Text, Stack, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <>
            <Container as={Stack} pl={6} py={3}>
                <Text color={useColorModeValue("gray.700", "gray.400")} fontSize={"sm"}>
                    © 2023 Gackathon. All rights reserved
                </Text>
            </Container>
        </>
    );
};
