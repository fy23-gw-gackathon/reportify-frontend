import { Card, CardBody, Divider, Heading, HStack, IconButton, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { FaPen } from "react-icons/all";

import { OrganizationResponse } from "@api/@types";
import { Title } from "@components/Layouts";
import { UpdateMvvModal } from "@components/Modals";

export const ManageMvvCard = ({ organization }: { organization: OrganizationResponse }) => {
    const disclosure = useDisclosure();
    const handleEditMvv = useCallback(() => {
        disclosure.onOpen();
        return;
    }, [disclosure]);
    return (
        <Card w={"full"} rounded={3}>
            <CardBody>
                <VStack align={"start"} pb={5} spacing={5}>
                    <HStack>
                        <Title title={"MVV"} />
                        <IconButton bg="transparent" aria-label={"edit-role"} icon={<FaPen />} onClick={handleEditMvv} />
                    </HStack>
                    <Divider />
                    <Stack>
                        <Heading size="md">MISSION</Heading>
                        <Text>{organization.mvv.mission}</Text>
                        <Heading size="md">VISION</Heading>
                        <Text>{organization.mvv.vision}</Text>
                        <Heading size="md">VALUE</Heading>
                        <Text>{organization.mvv.value}</Text>
                    </Stack>
                </VStack>
            </CardBody>
            <UpdateMvvModal disclosure={disclosure} organization={organization} />
        </Card>
    );
};
