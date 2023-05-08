import { EmailIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { InviteUserRequest } from "@api/@types";
import { UseDisclosureType } from "@types";

export const InviteMemberModal = ({ disclosure }: { disclosure: UseDisclosureType }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<InviteUserRequest>({
        defaultValues: {
            email: "",
        },
    });
    const { onClose, isOpen } = disclosure;
    const toast = useToast({
        title: "メンバー招待",
        isClosable: true,
    });
    const handleInvite = useCallback(() => {
        onClose();
        toast({
            description: "メンバーを招待しました。",
            status: "success",
            duration: 3000,
        });
        return;
    }, [onClose]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(handleInvite)}>
                    <ModalHeader>メールアドレスで招待</ModalHeader>
                    <Divider />
                    <ModalBody py={6}>
                        <FormControl isInvalid={!!errors.email}>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <EmailIcon color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    placeholder="xxx@xxx.jp"
                                    {...register("email", {
                                        required: "入力が必須のフィールドです。",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                                            message: "正しいメールアドレスを入力してください。",
                                        },
                                    })}
                                />
                            </InputGroup>
                            {errors.email && <FormErrorMessage>{errors.email.message?.toString()}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                        <Button mr={3} colorScheme="teal" type="submit">
                            招待する
                        </Button>
                        <Button onClick={onClose}>キャンセル</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
