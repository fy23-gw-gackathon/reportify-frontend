import { ArrowLeftIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, useColorModeValue, Text, VStack, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiSettings } from "react-icons/fi";

const navItems = [
    {
        icon: <EditIcon />,
        label: "日報リスト",
        link: "/reports",
    },
    {
        icon: <FiSettings />,
        label: "組織管理",
        link: "/organization",
    },
];

export const Sidebar = () => {
    return (
        <>
            <VStack
                align={{ base: "start" }}
                justify={{ base: "space-between" }}
                minW={"64"}
                maxW={"64"}
                h={"full"}
                borderRight="1px"
                borderRightColor={useColorModeValue("gray.200", "gray.700")}
                bgColor={useColorModeValue("white", "gray.800")}
            >
                <VStack align={"start"} gap={10} h={"full"} pt={4} px={8}>
                    <NextLink href={"/"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            Reportify
                        </Text>
                    </NextLink>

                    <VStack align={"start"} gap={4}>
                        {navItems.map((item) => {
                            return (
                                <NextLink href={item.link} key={item.label}>
                                    <HStack justify={"start"} gap={2} _hover={{ color: "teal.500" }}>
                                        {item.icon}
                                        <Text>{item.label}</Text>
                                    </HStack>
                                </NextLink>
                            );
                        })}
                    </VStack>
                </VStack>

                <Box w={"full"} color="teal.500" borderTop={"1px"} borderTopColor={useColorModeValue("gray.300", "gray.700")}>
                    <NextLink href={"/"}>
                        <HStack px={8} py={3}>
                            <ArrowLeftIcon />
                            <Text>HOME</Text>
                        </HStack>
                    </NextLink>
                </Box>
            </VStack>
        </>
    );
};
