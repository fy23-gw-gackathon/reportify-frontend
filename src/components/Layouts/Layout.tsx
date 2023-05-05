import { Container, Stack, VStack, HStack, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import { Footer } from "@components/Layouts/Footer";
import { Header } from "@components/Layouts/Header";
import { Sidebar } from "@components/Sidebar";

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    return (
        <Container as={Stack} align={{ base: "center" }} justify={{ base: "space-between" }} minW={"full"} h={"100vh"} p={0}>
            <HStack w={"full"} h={"full"} spacing={0}>
                <Sidebar></Sidebar>
                <VStack justify={{ base: "space-between" }} w={"full"} h={"full"} spacing={0}>
                    <Header />
                    <VStack
                        align={{ base: "start" }}
                        justify={{ base: "space-between" }}
                        overflow={"auto"}
                        w={"full"}
                        h={"full"}
                        bgColor={"gray.100"}
                    >
                        <Box mx={6} my={4}>
                            {children}
                        </Box>
                        <Footer></Footer>
                    </VStack>
                </VStack>
            </HStack>
        </Container>
    );
};
