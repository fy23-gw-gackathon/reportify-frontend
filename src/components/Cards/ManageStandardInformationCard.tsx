import { Card, Button, HStack, CardBody, CardHeader, Divider, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { UpdateStandardInformationModal } from "@components/Modals";

export const ManageStandardInformationCard = ({
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
                    <Heading size="md">基本情報</Heading>
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
                    <Heading size="md">組織名</Heading>
                    <Text>{organization.name}</Text>
                    <Heading size="md">組織コード</Heading>
                    <Text>{organization.code}</Text>
                </Stack>
            </CardBody>
            <UpdateStandardInformationModal disclosure={disclosure} organization={organization} updateOrganization={updateOrganization} />
        </Card>
    );
};
