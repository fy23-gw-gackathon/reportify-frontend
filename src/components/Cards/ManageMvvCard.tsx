import { HStack, Button, Card, CardBody, CardHeader, Divider, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { UpdateMvvModal } from "@components/Modals";

export const ManageMvvCard = ({
    organization,
    updateOrganization,
}: {
    organization: OrganizationResponse;
    updateOrganization: (organizationCode: string, body: UpdateOrganizationRequest) => Promise<void>;
}) => {
    const disclosure = useDisclosure();
    return (
        <Card w={"full"} rounded={3}>
            <CardHeader py={2}>
                <HStack justify={"space-between"}>
                    <Heading size="md">MVV</Heading>
                    <Button h={8} colorScheme="pink" leftIcon={<AiFillEdit />} onClick={disclosure.onOpen} rounded={3} variant="outline">
                        <Text pt={0.5} fontSize={"sm"} fontWeight={"normal"}>
                            編集
                        </Text>
                    </Button>
                </HStack>
            </CardHeader>

            <Divider color={"gray.400"}></Divider>

            <CardBody>
                <Stack>
                    <Heading size="md">MISSION</Heading>
                    <Text>{organization.mvv.mission}</Text>
                    <Heading size="md">VISION</Heading>
                    <Text>{organization.mvv.vision}</Text>
                    <Heading size="md">VALUE</Heading>
                    <Text>{organization.mvv.value}</Text>
                </Stack>
            </CardBody>
            <UpdateMvvModal disclosure={disclosure} organization={organization} updateOrganization={updateOrganization} />
        </Card>
    );
};
