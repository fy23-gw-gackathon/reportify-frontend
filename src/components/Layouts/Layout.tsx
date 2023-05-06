import { Container, Stack, VStack, HStack, Box, useColorModeValue } from "@chakra-ui/react";
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
                        overflowY={"auto"}
                        w={"full"}
                        maxW={"full"}
                        h={"full"}
                        bgColor={useColorModeValue("gray.100", "gray.900")}
                    >
                        {/* full を指定すると画面からはみ出てしまうので、サイドバーの長さから計算している */}
                        <Box w={"calc(100vw - 256px)"} px={6} py={4}>
                            {children}
                        </Box>
                        <Footer></Footer>
                    </VStack>
                </VStack>
            </HStack>
        </Container>
    );
};
