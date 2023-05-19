import { Icon } from "@chakra-ui/icons";
import { Card, CardBody, Divider, CardHeader, Heading, HStack, Box, Text, useColorMode, Grid, GridItem, Stack } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { SiCodereview } from "react-icons/si";

import { Title } from "@components/Layouts";
import { ReportStatusTag } from "@components/Tags";
import { useOrganization } from "@hooks/useOrganization";
import { useOrganizationReport } from "@hooks/useOrganizationReport";
import { markdownIt } from "@utils/markdown";

export default function Report() {
    const router = useRouter();

    const reportId = router.query.report_id;
    const { organization } = useOrganization();
    const { report, error } = useOrganizationReport(organization ? organization.code : "invalid", reportId as string);

    if (error) {
        return <Error statusCode={404} />;
    } else {
        return (
            <Box as={"section"} gap={2} w={"full"}>
                <Title title={"日報詳細"}></Title>
                {report && (
                    <Grid gap={6} templateColumns="repeat(14, 1fr)" w={"full"} my={4}>
                        <GridItem colSpan={10}>
                            <Card w={"full"} mb={6} rounded={3}>
                                <CardBody>
                                    <Markdown content={report.body} />
                                </CardBody>
                            </Card>

                            {report.reviewBody && (
                                <Card w={"full"} rounded={3}>
                                    <CardHeader>
                                        <HStack>
                                            <Icon as={SiCodereview} />
                                            <Heading size="md">AIレビュー</Heading>
                                        </HStack>
                                    </CardHeader>
                                    <Divider color={"gray.400"} />
                                    <CardBody>
                                        <Markdown content={report.reviewBody} />
                                    </CardBody>
                                </Card>
                            )}
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Card mb={4} rounded={3}>
                                <CardBody>
                                    <Stack>
                                        <HStack justifyContent={"space-between"} pb={2} px={2}>
                                            <HStack>
                                                <Heading color={"gray"} size={"sm"}>
                                                    投稿者
                                                </Heading>
                                            </HStack>
                                            <HStack>
                                                <Avatar
                                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                                    name={report.userId}
                                                    size={30}
                                                    variant="marble"
                                                />
                                                <Text fontWeight="medium">{report.userName}</Text>
                                            </HStack>
                                        </HStack>

                                        <Divider color={"gray.400"} />

                                        <HStack justifyContent={"space-between"} p={2}>
                                            <HStack>
                                                <Heading color={"gray"} size={"sm"}>
                                                    日付
                                                </Heading>
                                            </HStack>
                                            <Text>{new Date(report.timestamp).toLocaleDateString()}</Text>
                                        </HStack>

                                        <Divider color={"gray.400"} />

                                        <HStack justifyContent={"space-between"} pt={2} px={2}>
                                            <HStack>
                                                <Heading color={"gray"} size={"sm"}>
                                                    ステータス
                                                </Heading>
                                            </HStack>
                                            <ReportStatusTag report={report} />
                                        </HStack>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                )}
            </Box>
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
