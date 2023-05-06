import { Container, Text, Stack } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <>
            <Container as={Stack} pl={6} py={3}>
                <Text color={"gray.700"} fontSize={"sm"}>
                    © 2023 Gackathon. All rights reserved
                </Text>
            </Container>
        </>
    );
};
