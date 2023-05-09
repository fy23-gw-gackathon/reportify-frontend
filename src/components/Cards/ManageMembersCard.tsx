import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Button,
    CardHeader,
    Heading,
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
import React, { useCallback, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiAdminLine, RiUserLine } from "react-icons/ri";

import { OrganizationResponse, UserOrganization, UserResponse } from "@api/@types";
import { DeleteConfirmModal, EditRoleModal, InviteMemberModal } from "@components/Modals";

export const ManageMembersCard = ({ organization, users }: { organization: OrganizationResponse; users: UserResponse[] }) => {
    const inviteMemberDisclosure = useDisclosure();
    const editRoleDisclosure = useDisclosure();
    const deleteUserDisclosure = useDisclosure();

    const [selectedUser, setSelectedUser] = useState<UserResponse>();

    const handleEditRole = useCallback(() => {
        return;
    }, []);
    const handleDeleteUser = useCallback(() => {
        return;
    }, []);
    return (
        <Card w={"full"} rounded={3}>
            <CardHeader py={3}>
                <HStack justify={"space-between"}>
                    <Heading size="md">所属メンバー</Heading>
                </HStack>
            </CardHeader>

            <Divider color={"gray.400"}></Divider>

            <CardBody>
                <VStack align={"start"} spacing={5}>
                    <HStack justifyContent="space-between" w="full">
                        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={inviteMemberDisclosure.onOpen} rounded={3}>
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
                                    return (
                                        <Tr key={user.id}>
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>
                                                <UserRoleTag user={user} organizationId={organization.id} />
                                            </Td>
                                            <Td>
                                                <HStack justifyContent={"center"}>
                                                    <IconButton
                                                        bg="transparent"
                                                        aria-label={"edit-role"}
                                                        icon={<MdEdit />}
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            editRoleDisclosure.onOpen();
                                                        }}
                                                    />
                                                    <IconButton
                                                        bg="transparent"
                                                        aria-label={"delete-user"}
                                                        icon={<DeleteIcon />}
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            deleteUserDisclosure.onOpen();
                                                        }}
                                                    />
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            <TableCaption />
                        </Table>
                    </TableContainer>
                </VStack>
                {selectedUser && (
                    <>
                        <InviteMemberModal disclosure={inviteMemberDisclosure} />
                        <EditRoleModal
                            handleEditRole={handleEditRole}
                            disclosure={editRoleDisclosure}
                            user={selectedUser}
                            organizationId={organization.id}
                        />
                        <DeleteConfirmModal
                            disclosure={deleteUserDisclosure}
                            handleDelete={handleDeleteUser}
                            deleteResourceName={selectedUser.name}
                            deleteCategory={"ユーザー"}
                        />
                    </>
                )}
            </CardBody>
        </Card>
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
