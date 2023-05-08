import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardBody,
    Divider,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { FaPen, RiAdminLine, RiUserLine } from "react-icons/all";

import { OrganizationResponse, UserOrganization, UserResponse } from "@api/@types";
import { Title } from "@components/Layouts";
import { DeleteConfirmModal, EditRoleModal, InviteMemberModal } from "@components/Modals";

export const ManageMembersCard = ({ organization, users }: { organization: OrganizationResponse; users: UserResponse[] }) => {
    const disclosure = useDisclosure();
    return (
        <Card w={"full"} rounded={3}>
            <CardBody>
                <VStack align={"start"} spacing={5}>
                    <Title title={"所属メンバー"} />
                    <Divider />
                    <HStack justifyContent="space-between" w="full">
                        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={disclosure.onOpen} rounded={3}>
                            <Text pt={0.5} fontWeight={"normal"}>
                                メンバー招待
                            </Text>
                        </Button>
                        <InputGroup w="400px">
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.300" />
                            </InputLeftElement>
                            <Input placeholder="名前で検索" />
                        </InputGroup>
                    </HStack>
                    <TableContainer w={"full"}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>名前</Th>
                                    <Th>メールアドレス</Th>
                                    <Th>ロール</Th>
                                    <Th textAlign={"center"}>操作</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user) => {
                                    return <MemberRow user={user} organizationId={organization.id} key={user.id} />;
                                })}
                            </Tbody>
                            <TableCaption />
                        </Table>
                    </TableContainer>
                </VStack>
                <InviteMemberModal disclosure={disclosure} />
            </CardBody>
        </Card>
    );
};

const MemberRow = ({ user, organizationId }: { user: UserResponse; organizationId: string }) => {
    const editRoleDisclosure = useDisclosure();
    const deleteUserDisclosure = useDisclosure();
    const handleEditRole = useCallback(() => {
        return;
    }, []);
    const handleDeleteUser = useCallback(() => {
        return;
    }, []);
    return (
        <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
                <UserRoleTag user={user} organizationId={organizationId} />
            </Td>
            <Td>
                <HStack justifyContent={"center"}>
                    <IconButton bg="transparent" aria-label={"edit-role"} icon={<FaPen />} onClick={editRoleDisclosure.onOpen} />
                    <IconButton bg="transparent" aria-label={"delete-user"} icon={<DeleteIcon />} onClick={deleteUserDisclosure.onOpen} />
                </HStack>
            </Td>
            <EditRoleModal handleEditRole={handleEditRole} disclosure={editRoleDisclosure} user={user} organizationId={organizationId} />
            <DeleteConfirmModal
                disclosure={deleteUserDisclosure}
                handleDelete={handleDeleteUser}
                deleteResourceName={user.name}
                deleteCategory={"ユーザー"}
            />
        </Tr>
    );
};

const UserRoleTag = ({ user, organizationId }: { user: UserResponse; organizationId: string }) => {
    const isAdmin = user.organizations.some((organization: UserOrganization) => organization.id === organizationId && organization.is_admin);
    const colorScheme = isAdmin ? "green" : "gray";
    const icon = isAdmin ? RiAdminLine : RiUserLine;
    const tagLabel = isAdmin ? "管理者" : "メンバー";
    return (
        <Tag borderRadius="full" colorScheme={colorScheme} size="md">
            <TagLeftIcon as={icon} />
            <TagLabel>
                <Text fontWeight={"normal"}>{tagLabel}</Text>
            </TagLabel>
        </Tag>
    );
};
