import { VStack } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

import { ManageMembersCard, ManageMvvCard, ManageStandardInformationCard } from "@components/Cards";
import { Title } from "@components/Layouts";
import { activatedOrganizationState } from "@store/organization";

export default function Organization() {
    const [activatedOrganization] = useRecoilState(activatedOrganizationState);

    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"組織管理"}></Title>
            <ManageStandardInformationCard organization={activatedOrganization} />
            <ManageMvvCard organization={activatedOrganization} />
            <ManageMembersCard organization={activatedOrganization} />
        </VStack>
    );
}
