import { MoonIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Text, IconButton, useColorModeValue, useBreakpointValue, HStack, Avatar, VStack } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export const Header = () => {
    const userName = "Your Name";

    return (
        <Box
            w={"full"}
            borderBottom="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            bgColor={useColorModeValue("white", "gray.800")}
        >
            <HStack justify={"space-between"} pr={6} pl={2} py={2}>
                <HStack align={{ base: "center" }} justify={{ base: "start" }}>
                    <IconButton aria-label={""} icon={<SearchIcon />} variant="ghost" />
                    <Text fontFamily={"heading"} textAlign={useBreakpointValue({ base: "center", md: "left" })}>
                        技術統括部エンジニアリング室新卒研修
                    </Text>
                </HStack>

                <HStack>
                    <IconButton aria-label={""} icon={<MoonIcon />} variant="ghost" />
                    <IconButton aria-label={""} icon={<BellIcon />} variant="ghost" />

                    <HStack pl={2}>
                        <Avatar name={userName} size={"sm"} />
                        <VStack alignItems="flex-start" display={{ base: "none", md: "flex" }} ml="2" spacing="1px">
                            <Text fontSize="sm">{userName}</Text>
                            <Text color="gray.600" fontSize="xs">
                                Admin
                            </Text>
                        </VStack>
                        <FiChevronDown />
                    </HStack>
                </HStack>
            </HStack>
        </Box>
    );
};
