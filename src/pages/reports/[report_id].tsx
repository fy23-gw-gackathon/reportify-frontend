import { VStack, Card, CardBody } from "@chakra-ui/react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import { Title } from "@components/Layouts";

export default function Report() {
    const router = useRouter();

    const reportId = router.query.report_id;

    if (!reportId) {
        return <Error statusCode={404} />;
    } else {
        return (
            <VStack align={"start"} gap={2} w={"full"}>
                <Title title={"日報詳細"}></Title>

                <Card w={"full"} rounded={3}>
                    <CardBody></CardBody>
                </Card>
            </VStack>
        );
    }
}
