import {
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { UseDisclosureType } from "@types";

export const UpdateStandardInformationModal = ({
    disclosure,
    organization,
}: {
    disclosure: UseDisclosureType;
    organization: OrganizationResponse;
}) => {
    const { isOpen, onClose } = disclosure;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<UpdateOrganizationRequest>({
        defaultValues: {
            mission: organization.mvv.mission,
            vision: organization.mvv.vision,
            value: organization.mvv.value,
            name: organization.name,
            code: organization.code,
        },
    });

    const toast = useToast({
        title: "組織情報の更新",
        isClosable: true,
    });

    const handleUpdate = useCallback(() => {
        onClose();
        toast({
            description: "組織情報を更新しました。",
            status: "success",
            duration: 3000,
        });
        return;
    }, [onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <ModalHeader>
                        <Text>組織情報の更新</Text>
                    </ModalHeader>
                    <Divider />
                    <ModalBody pt={4} pb={6}>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel fontWeight={"bold"} htmlFor="name">
                                組織名
                            </FormLabel>
                            <Input
                                id="name"
                                placeholder="name"
                                {...register("name", {
                                    required: "入力が必須のフィールドです。",
                                })}
                            />
                            {errors.name && <FormErrorMessage>{errors.name.message?.toString()}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.code}>
                            <FormLabel mt={4} fontWeight={"bold"} htmlFor="code">
                                組織コード
                            </FormLabel>
                            <Input
                                id="code"
                                placeholder="code"
                                {...register("code", {
                                    required: "入力が必須のフィールドです。",
                                })}
                            />
                            {errors.code && <FormErrorMessage>{errors.code.message?.toString()}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                        <Button mr={3} colorScheme="teal" type="submit">
                            更新する
                        </Button>
                        <Button onClick={onClose}>キャンセル</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
