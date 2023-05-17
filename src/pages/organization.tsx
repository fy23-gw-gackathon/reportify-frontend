import { VStack } from "@chakra-ui/react";
import React from "react";

import { ManageMembersCard, ManageMvvCard, ManageStandardInformationCard } from "@components/Cards";
import { Title } from "@components/Layouts";
import { useOrganization } from "@hooks/useOrganization";
export default function Organization() {
    const { organization, updateOrganization } = useOrganization();

    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"組織管理"}></Title>
            {organization && (
                <>
                    <ManageStandardInformationCard organization={organization} updateOrganization={updateOrganization} />
                    <ManageMvvCard organization={organization} updateOrganization={updateOrganization} />
                    <ManageMembersCard organization={organization} />
                </>
            )}
        </VStack>
    );
}
