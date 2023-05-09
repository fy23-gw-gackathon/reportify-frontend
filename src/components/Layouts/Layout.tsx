import { Container, Stack, VStack, HStack, Box, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { Footer } from "@components/Layouts/Footer";
import { Header } from "@components/Layouts/Header";
import { Sidebar } from "@components/Sidebar";
import { useAuthenticatedUserState } from "@store/user";

type Props = {
    children: ReactNode;
};

const _Layout = ({ children }: Props) => {
    const router = useRouter();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const { isAuthenticated } = useAuthenticatedUserState();

    useEffect(() => {
        if (router.pathname !== "/auth/sign_in" && !isAuthenticated) router.replace("/auth/sign_in");
    }, [router, isAuthenticated]);

    return (
        <Container as={Stack} align={{ base: "center" }} justify={{ base: "space-between" }} minW={"full"} h={"100vh"} p={0}>
            {isAuthenticated && router.pathname !== "/auth/sign_in" ? (
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
                            bgColor={bgColor}
                        >
                            {/* full を指定すると画面からはみ出てしまうので、サイドバーの長さから計算している */}
                            <Box w={"calc(100vw - 256px)"} px={6} py={4}>
                                {children}
                            </Box>
                            <Footer></Footer>
                        </VStack>
                    </VStack>
                </HStack>
            ) : (
                children
            )}
        </Container>
    );
};

export const Layout = dynamic(() => Promise.resolve(_Layout), {
    ssr: false,
});
