import { Container, Stack, VStack, HStack, Box, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

import { Footer } from "@components/Layouts/Footer";
import { Header } from "@components/Layouts/Header";
import { Sidebar } from "@components/Sidebar";
import { authenticatedUserTokenRecoilState, useAuthenticatedUserState } from "@store/user";

type Props = {
    children: ReactNode;
};

const _Layout = ({ children }: Props) => {
    const { isAuthenticated } = useAuthenticatedUserState();
    // idToken取得前にuseSWRが走るの防ぐ為
    const { idToken } = useRecoilValue(authenticatedUserTokenRecoilState);

    const bgColor = useColorModeValue("gray.100", "gray.900");

    return (
        <Container as={Stack} align={{ base: "center" }} justify={{ base: "space-between" }} minW={"full"} h={"100vh"} p={0}>
            {isAuthenticated && idToken && (
                <HStack w={"full"} h={"full"} spacing={0}>
                    <Sidebar />
                    <VStack justify={{ base: "space-between" }} w={"full"} h={"full"} spacing={0}>
                        <Header />
                        <VStack
                            align={{ base: "start" }}
                            justify={{ base: "space-between" }}
                            overflowY={"auto"}
                            w={"full"}
                            maxW={"full"}
                            h={"full"}
                            bgColor={bgColor}
                        >
                            {/* full を指定すると画面からはみ出てしまうので、サイドバーの長さから計算している */}
                            <Box w={"calc(100vw - 256px)"} px={6} py={4}>
                                {children}
                            </Box>
                            <Footer />
                        </VStack>
                    </VStack>
                </HStack>
            )}
        </Container>
    );
};

export const Layout = dynamic(() => Promise.resolve(_Layout), {
    ssr: false,
});
