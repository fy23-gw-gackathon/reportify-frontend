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
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { UseDisclosureType } from "@types";

export const UpdateMvvModal = ({
    disclosure,
    organization,
    updateOrganization,
}: {
    disclosure: UseDisclosureType;
    organization: OrganizationResponse;
    updateOrganization: (organizationCode: string, body: UpdateOrganizationRequest) => Promise<void>;
}) => {
    const { isOpen, onClose } = disclosure;
    const defaultValues = useMemo(() => {
        return {
            mission: organization.mvv.mission,
            vision: organization.mvv.vision,
            value: organization.mvv.value,
            name: organization.name,
            code: organization.code,
        };
    }, [organization]);

    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        reset,
    } = useForm<UpdateOrganizationRequest>({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const toast = useToast({
        title: "MVVの更新",
        isClosable: true,
        position: "bottom-left",
    });

    const handleUpdate = useCallback(async () => {
        try {
            await updateOrganization(organization.code, getValues()).then(() => {
                onClose();
                toast({
                    description: "MVVを更新しました。",
                    status: "success",
                    duration: 3000,
                });
            });
        } catch (e) {
            toast({
                description: `${e}`,
                status: "error",
                duration: 3000,
            });
        }
    }, [getValues, onClose, organization.code, toast, updateOrganization]);

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
