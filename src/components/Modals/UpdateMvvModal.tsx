import {
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { UseDisclosureType } from "@types";

export const UpdateMvvModal = ({ disclosure, organization }: { disclosure: UseDisclosureType; organization: OrganizationResponse }) => {
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
        title: "MVVの更新",
        isClosable: true,
    });

    const handleUpdate = useCallback(() => {
        onClose();
        toast({
            description: "MVVを更新しました。",
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
                        <Text>MVVの更新</Text>
                    </ModalHeader>
                    <Divider />
                    <ModalBody pt={4} pb={6}>
                        <FormControl isInvalid={!!errors.mission}>
                            <FormLabel fontWeight={"bold"} htmlFor="mission">
                                MISSION
                            </FormLabel>
                            <Textarea
                                id="mission"
                                placeholder="mission"
                                {...register("mission", {
                                    required: "入力が必須のフィールドです。",
                                })}
                            />
                            {errors.mission && <FormErrorMessage>{errors.mission.message?.toString()}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.vision}>
                            <FormLabel mt={4} fontWeight={"bold"} htmlFor="vision">
                                VISION
                            </FormLabel>
                            <Textarea
                                id="vision"
                                placeholder="vision"
                                {...register("vision", {
                                    required: "入力が必須のフィールドです。",
                                })}
                            />
                            {errors.vision && <FormErrorMessage>{errors.vision.message?.toString()}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={!!errors.value}>
                            <FormLabel mt={4} fontWeight={"bold"} htmlFor="value">
                                VALUE
                            </FormLabel>
                            <Textarea
                                id="value"
                                placeholder="value"
                                {...register("value", {
                                    required: "入力が必須のフィールドです。",
                                })}
                            />
                            {errors.value && <FormErrorMessage>{errors.value.message?.toString()}</FormErrorMessage>}
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
