import { Card, CardBody, Divider, Heading, HStack, IconButton, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { FaPen } from "react-icons/all";

import { OrganizationResponse } from "@api/@types";
import { Title } from "@components/Layouts";
import { UpdateStandardInformationModal } from "@components/Modals";

export const ManageStandardInformationCard = ({ organization }: { organization: OrganizationResponse }) => {
    const disclosure = useDisclosure();
    const handleEditOrganization = useCallback(() => {
        disclosure.onOpen();
        return;
    }, [disclosure]);
    return (
        <Card w={"full"} rounded={3}>
            <CardBody>
                <VStack align={"start"} pb={5} spacing={5}>
                    <HStack>
                        <Title title={"基本情報"} />
                        <IconButton bg="transparent" aria-label={"edit-role"} icon={<FaPen />} onClick={handleEditOrganization} />
                    </HStack>
                    <Divider />
                    <Stack>
                        <Heading size="md">組織名</Heading>
                        <Text>{organization.name}</Text>
                        <Heading size="md">組織コード</Heading>
                        <Text>{organization.code}</Text>
                    </Stack>
                </VStack>
            </CardBody>
            <UpdateStandardInformationModal disclosure={disclosure} organization={organization} />
        </Card>
    );
};
