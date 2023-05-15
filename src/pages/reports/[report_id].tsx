import { VStack, Card, CardBody, Divider, CardHeader, Heading, HStack, Box, useColorMode } from "@chakra-ui/react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import { Title } from "@components/Layouts";
import { useOrganization } from "@hooks/useOrganization";
import { useOrganizationReport } from "@hooks/useOrganizationReport";
import { markdownIt } from "@utils/markdown";

export default function Report() {
    const router = useRouter();

    const reportId = router.query.report_id;
    const { organization } = useOrganization();
    const { report, error } = useOrganizationReport(organization.code, reportId as string);

    if (error) {
        return <Error statusCode={404} />;
    } else {
        return (
            <VStack align={"start"} gap={2} w={"full"}>
                <Title title={"日報詳細"}></Title>
                {report && (
                    <>
                        <Card w={"full"} rounded={3}>
                            <CardHeader>
                                <HStack justifyContent={"space-between"}>
                                    <Heading size="md">{report.userName}</Heading>
                                    <Heading color="gray" size="sm">
                                        {report.timestamp}
                                    </Heading>
                                </HStack>
                            </CardHeader>
                            <Divider color={"gray.400"} />
                            <CardBody>
                                <Markdown content={report.body} />
                            </CardBody>
                        </Card>

                        {report.reviewBody && (
                            <Card w={"full"} rounded={3}>
                                <CardHeader>
                                    <HStack>
                                        <Heading size="md">AIレビュー</Heading>
                                    </HStack>
                                </CardHeader>
                                <Divider color={"gray.400"} />
                                <CardBody>
                                    <Markdown content={report.reviewBody} />
                                </CardBody>
                            </Card>
                        )}

                        {report.tasks && (
                            <Card w={"full"} rounded={3}>
                                <CardHeader>
                                    <HStack>
                                        <Heading size="md">明日やること</Heading>
                                    </HStack>
                                </CardHeader>
                                <Divider color={"gray.400"} />
                                <CardBody></CardBody>
                            </Card>
                        )}
                    </>
                )}
            </VStack>
        );
    }
}

const Markdown = ({ content }: { content: string }) => {
    const { colorMode } = useColorMode();
    return (
        <Box
            className={colorMode === "dark" ? "markdown-body-dark" : "markdown-body"}
            as={"div"}
            dangerouslySetInnerHTML={{ __html: markdownIt.render(content) }}
        />
    );
};
