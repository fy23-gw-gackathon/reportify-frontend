import { Box, Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";

import { UserResponse } from "@api/@types";
import { UseDisclosureType } from "@types";

export const EditRoleModal = ({
    handleEditRole,
    disclosure,
    user,
    organizationId,
}: {
    handleEditRole: () => void;
    disclosure: UseDisclosureType;
    user: UserResponse;
    organizationId: string;
}) => {
    const { onClose, isOpen } = disclosure;
    const isAdmin = user.organizations.some((organization) => organization.is_admin && organization.id === organizationId);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>ロール変更</Text>
                </ModalHeader>
                <Divider />
                <ModalBody p={6}>
                    <Text>
                        <Box as={"span"} fontWeight="semibold">
                            {user.name}
                        </Box>
                        は現在
                        <Box as={"span"} color={isAdmin ? "green" : "gray"} fontWeight="bold">
                            {isAdmin ? "管理者" : "メンバー"}
                        </Box>
                        です。
                    </Text>
                    <Text>
                        ロールを
                        <Box as={"span"} color={!isAdmin ? "green" : "gray"} fontWeight="bold">
                            {!isAdmin ? "管理者" : "メンバー"}
                        </Box>
                        に変更してよろしいですか？
                    </Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button mr={3} colorScheme="teal" onClick={handleEditRole}>
                        変更する
                    </Button>
                    <Button onClick={onClose}>キャンセル</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
