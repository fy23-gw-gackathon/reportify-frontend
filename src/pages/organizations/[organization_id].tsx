import { VStack, Card, CardBody } from "@chakra-ui/react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import { Title } from "@components/Layouts";

export default function Organizations() {
    const router = useRouter();

    const organizationId = router.query.organization_id;

    if (!organizationId) {
        return <Error statusCode={404} />;
    } else {
        return (
            <VStack align={"start"} gap={2} w={"full"}>
                <Title title={"組織管理"}></Title>

                <Card w={"full"} rounded={3}>
                    <CardBody></CardBody>
                </Card>
            </VStack>
        );
    }
}
