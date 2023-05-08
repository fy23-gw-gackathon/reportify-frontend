import { VStack } from "@chakra-ui/react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import { OrganizationResponse, UserResponse } from "@api/@types";
import { ManageMembersCard, ManageMvvCard, ManageStandardInformationCard } from "@components/Cards";
import { Title } from "@components/Layouts";

export default function Organizations() {
    const router = useRouter();
    const organizationId: string | undefined = "organizationId";

    const organization: OrganizationResponse = {
        id: organizationId,
        name: organizationId,
        code: organizationId,
        mvv: {
            mission: "一人ひとりに想像を超えるDelightを",
            vision:
                "DeNAは、インターネットやAIを自在に駆使しながら\n" +
                "一人ひとりの人生を豊かにするエンターテインメント領域と\n" +
                "日々の生活を営む空間と時間をより快適にする社会課題領域の\n" +
                "両軸の事業を展開するユニークな特性を生かし\n" +
                "挑戦心豊かな社員それぞれの個性を余すことなく発揮することで\n" +
                "世界に通用する新しいDelightを提供し続けます",
            value: "DeNA Promise",
        },
    };

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

    if (!organizationId) {
        return <Error statusCode={404} />;
    } else {
        return (
            <VStack align={"start"} gap={2} w={"full"}>
                <Title title={"組織管理"}></Title>
                <ManageStandardInformationCard organization={organization} />
                <ManageMvvCard organization={organization} />
                <ManageMembersCard organization={organization} users={users} />
            </VStack>
        );
    }
}
