import { MoonIcon, QuestionIcon, SearchIcon, SunIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Text,
    IconButton,
    useColorModeValue,
    useBreakpointValue,
    HStack,
    Avatar,
    VStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider,
    useColorMode,
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useRecoilState } from "recoil";

import { activatedOrganizationState } from "@store/organization";
import { loginUserState } from "@store/user";

export const Header = () => {
    const router = useRouter();

    const [loginUser] = useRecoilState(loginUserState);
    const [activatedOrganization] = useRecoilState(activatedOrganizationState);

    useEffect(() => {
        if (router.query.organization !== activatedOrganization.code) {
            // FIXME: 日報詳細画面でリロードすると「The provided href value is missing query values to be interpolated properly」とエラーが出る
            // router.replace({
            //     query: { ...router.query, organization: activatedOrganization.code },
            // });
        }
    }, [router, activatedOrganization]);

    return (
        <Box
            w={"full"}
            borderBottom="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            bgColor={useColorModeValue("white", "gray.800")}
        >
            <HStack justify={"space-between"} pr={6} pl={2} py={2}>
                <HStack align={{ base: "center" }} justify={{ base: "start" }}>
                    {SearchOrganizationsMenu()}
                    <Text fontFamily={"heading"} textAlign={useBreakpointValue({ base: "center", md: "left" })}>
                        {activatedOrganization.name}
                    </Text>
                </HStack>

                <HStack>
                    {SwitchColorModeButton()}
                    {InfoMenu()}

                    {loginUser ? (
                        <HStack pl={2}>
                            <Avatar name={loginUser.name} size={"sm"} />
                            <VStack alignItems="flex-start" display={{ base: "none", md: "flex" }} ml="2" spacing="1px">
                                <Text fontSize="sm">{loginUser.name}</Text>
                                <Text color="gray.600" fontSize="xs">
                                    Admin
                                </Text>
                            </VStack>
                            <FiChevronDown />
                        </HStack>
                    ) : (
                        <></>
                    )}
                </HStack>
            </HStack>
        </Box>
    );
};

const SwitchColorModeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <IconButton aria-label={""} icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} variant="ghost" />;
};

const SearchOrganizationsMenu = () => {
    const router = useRouter();
    // TODO: 組織リスト取得APIを実行
    const [activatedOrganization, setActivatedOrganization] = useRecoilState(activatedOrganizationState);
    const organizations = [
        {
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            name: "技術統括部エンジニアリング室新卒研修",
            code: "fy23-eng-training",
            mvv: {
                mission: "",
                vision: "",
                value: "",
            },
        },
        {
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            name: "DeNA.vim",
            code: "vim",
            mvv: {
                mission: "",
                vision: "",
                value: "",
            },
        },
    ];

    return (
        <Menu>
            <MenuButton as={IconButton} aria-label={""} icon={<SearchIcon />} variant="ghost"></MenuButton>

            <MenuList>
                <Text w={"full"} py={1} textAlign={"center"}>
                    組織を選択
                </Text>
                <MenuDivider />

                {organizations.map((organization) => {
                    return (
                        <MenuItem
                            key={organization.code}
                            as={NextLink}
                            href={{ pathname: router.pathname, query: { ...router.query, organization: organization.code } }}
                            onClick={() => {
                                setActivatedOrganization(organization);
                            }}
                        >
                            {activatedOrganization.code === organization.code ? (
                                <Text color={"teal.500"}>{organization.name}</Text>
                            ) : (
                                <Text>{organization.name}</Text>
                            )}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

const InfoMenu = () => {
    return (
        <Menu>
            <MenuButton as={IconButton} aria-label={""} icon={<QuestionIcon />} variant="ghost"></MenuButton>

            <MenuList minW={"80"}>
                <Text w={"full"} py={1} textAlign={"center"}>
                    ヘルプ
                </Text>
                <MenuDivider />
                <MenuItem as={Link} gap={3} href={"https://github.com/fy23-gw-gackathon/reportify-frontend/wiki"} isExternal>
                    <Text>ドキュメントを読む</Text>
                    <ExternalLinkIcon />
                </MenuItem>
                <MenuItem as={Link} gap={3} href={"https://github.com/fy23-gw-gackathon/reportify-frontend/issues"} isExternal>
                    <Text>フィードバックを送信</Text>
                    <ExternalLinkIcon />
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
