import { MoonIcon, QuestionIcon, SearchIcon, SunIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Text,
    IconButton,
    useColorModeValue,
    useBreakpointValue,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider,
    useColorMode,
    Link,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useOrganizations } from "@hooks/useOrganizations";
import { activatedOrganizationState, getStoredActivatedOrganizationCode, useActivatedOrganizationMutator } from "@store/organization";
import { authenticatedUserTokenRecoilState, useAuthenticatedUserMutator, useAuthenticatedUserState } from "@store/user";

export const Header = () => {
    const router = useRouter();
    //const [loginUser] = useRecoilState(loginUserState); //useSessionすればいらないかも？
    const [activatedOrganization] = useRecoilState(activatedOrganizationState);

    useEffect(() => {
        if (activatedOrganization && router.query.organization !== activatedOrganization.code) {
            router.replace({
                query: { ...router.query, organization: activatedOrganization.code },
            });
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
                        {activatedOrganization && activatedOrganization.name}
                    </Text>
                </HStack>

                <HStack>
                    {SwitchColorModeButton()}
                    {InfoMenu()}

                    {UserMenu()}
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
    const { organizations } = useOrganizations();

    const [activatedOrganization] = useRecoilState(activatedOrganizationState);
    const { setActivatedOrganization } = useActivatedOrganizationMutator();

    useEffect(() => {
        console.log("-------------------");
        console.log(getStoredActivatedOrganizationCode());
        console.log("-------------------");
        const orgCode = activatedOrganization ? activatedOrganization.code : getStoredActivatedOrganizationCode();
        const newOrganizationState = activatedOrganization && organizations.find((organization) => organization.code === orgCode);
        if (newOrganizationState) setActivatedOrganization(newOrganizationState);
        else if (organizations.length > 0) setActivatedOrganization(organizations[0]);
    }, [organizations]);

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
                            {activatedOrganization && activatedOrganization.code === organization.code ? (
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

const UserMenu = () => {
    const router = useRouter();
    const { setAuthenticatedUser } = useAuthenticatedUserMutator();
    const setIdToken = useSetRecoilState(authenticatedUserTokenRecoilState);
    const { user } = useAuthenticatedUserState();
    const onSignOutClick = async () => {
        await Auth.signOut();
        setAuthenticatedUser({ user: undefined });
        setIdToken({ idToken: undefined });
        router.replace("/auth/sign_in");
    };

    return <IconButton aria-label={""} icon={<MdLogout />} onClick={onSignOutClick} variant="ghost"></IconButton>;
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
