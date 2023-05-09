import { VStack } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

import { UserResponse } from "@api/@types";
import { ManageMembersCard, ManageMvvCard, ManageStandardInformationCard } from "@components/Cards";
import { Title } from "@components/Layouts";
import { activatedOrganizationState } from "@store/organization";

export default function Organization() {
    const [activatedOrganization] = useRecoilState(activatedOrganizationState);

    const users: UserResponse[] = [];
    for (let i = 0; i < 4; i++) {
        users.push({
            id: `id_${i}`,
            name: `user_${i}`,
            email: `user_${i}@gmail.com`,
            organizations: [
                {
                    id: "organizationId",
                    is_admin: i % 2 === 0,
                },
            ],
        });
    }

    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"組織管理"}></Title>
            <ManageStandardInformationCard organization={activatedOrganization} />
            <ManageMvvCard organization={activatedOrganization} />
            <ManageMembersCard organization={activatedOrganization} users={users} />
        </VStack>
    );
}
