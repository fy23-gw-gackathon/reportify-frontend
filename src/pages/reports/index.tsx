import { AddIcon } from "@chakra-ui/icons";
import { VStack, Card, CardBody, Table, Thead, Tbody, Tr, Th, TableContainer, Text, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillWarning } from "react-icons/ai";
import { IoMdThumbsUp } from "react-icons/io";

import { ReportResponse } from "@api/@types";
import { LinkButton } from "@components/Buttons";
import { Title } from "@components/Layouts";
import { useOrganizationReports } from "@hooks/useOrganizationReports";

export default function Reports() {
    const router = useRouter();

    const { reports } = useOrganizationReports("NewGraduateTraining2");

    return (
        <VStack align={"start"} gap={2}>
            <Title title={"日報リスト"}></Title>

            <Card w={"full"} rounded={3}>
                <CardBody>
                    <VStack align={"start"} spacing={5}>
                        <LinkButton icon={<AddIcon />} label={"新規投稿"} href={"/reports/new"}></LinkButton>

                        {/* TODO: 本文がはみ出る場合はトリミングし「...」表示すること */}
                        <TableContainer w={"full"}>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>投稿日時</Th>
                                        <Th>投稿者</Th>
                                        <Th>ステータス</Th>
                                        <Th>本文</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {reports.map((report) => {
                                        return (
                                            <Tr
                                                key={report.id}
                                                onClick={() => {
                                                    router.push({ pathname: `/reports/[report_id]`, query: { report_id: report.id } });
                                                }}
                                            >
                                                <Th>{report.timestamp}</Th>
                                                <Th>{report.userName}</Th>
                                                <Th>{ReportStatusTag(report)}</Th>
                                                <Th>
                                                    <Text>{report.body}</Text>
                                                </Th>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    );
}

const ReportStatusTag = (report: ReportResponse) => {
    const colorScheme = report.reviewBody !== null ? "green" : "orange";
    const icon = report.reviewBody !== null ? IoMdThumbsUp : AiFillWarning;
    const tagLabel = report.reviewBody !== null ? "レビュー済み" : "レビュー待ち";
    return (
        <Tag borderRadius="full" colorScheme={colorScheme} size="md">
            <TagLeftIcon as={icon} />
            <TagLabel>
                <Text pt={0.5} fontWeight={"normal"}>
                    {tagLabel}
                </Text>
            </TagLabel>
        </Tag>
    );
};
