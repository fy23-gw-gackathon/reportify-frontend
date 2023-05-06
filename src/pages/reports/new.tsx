import { VStack, Card, CardBody } from "@chakra-ui/react";

import { Title } from "@components/Layouts";

export default function New() {
    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"新規投稿"}></Title>

            <Card w={"full"} rounded={3}>
                <CardBody></CardBody>
            </Card>
        </VStack>
    );
}
