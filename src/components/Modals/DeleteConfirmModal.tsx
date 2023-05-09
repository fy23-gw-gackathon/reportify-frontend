import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";

import { UseDisclosureType } from "@types";

export const DeleteConfirmModal = ({
    handleDelete,
    disclosure,
    deleteCategory,
    deleteResourceName,
}: {
    handleDelete: () => void;
    disclosure: UseDisclosureType;
    deleteCategory: string;
    deleteResourceName: string;
}) => {
    const { onClose, isOpen } = disclosure;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>{deleteCategory}の削除</Text>
                </ModalHeader>
                <Divider />
                <ModalBody p={6}>
                    <Text>
                        {deleteResourceName}を削除します。
                        <br />
                        削除された{deleteCategory}は元に戻せません。
                        <br />
                        {deleteResourceName}を削除しても良いですか？
                    </Text>
                </ModalBody>
                <Divider />
                <ModalFooter>
                    <Button mr={3} colorScheme="teal" onClick={handleDelete}>
                        削除する
                    </Button>
                    <Button onClick={onClose}>キャンセル</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
