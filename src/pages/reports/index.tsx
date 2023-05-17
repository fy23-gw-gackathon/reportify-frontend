import { AddIcon } from "@chakra-ui/icons";
import { VStack, Card, CardBody, Table, Thead, Tbody, Tr, Th, TableContainer, Text, Td } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ReportResponse } from "@api/@types";
import { LinkButton } from "@components/Buttons";
import { Title } from "@components/Layouts";
import { ReportStatusTag } from "@components/Tags";
import { useOrganization } from "@hooks/useOrganization";
import { useOrganizationReports } from "@hooks/useOrganizationReports";

export default function Reports() {
    const router = useRouter();
    const { organization } = useOrganization();
    const { reports } = useOrganizationReports(organization.code);

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
                                    {reports && reports.map((report: ReportResponse) => {
                                        return (
                                            <Tr
                                                key={report.id}
                                                onClick={() => {
                                                    router.push({ pathname: `/reports/[report_id]`, query: { report_id: report.id } });
                                                }}
                                            >
                                                <Td>{report.timestamp}</Td>
                                                <Td>{report.userName}</Td>
                                                <Td>
                                                    <ReportStatusTag report={report} />
                                                </Td>
                                                <Td>
                                                    <Text>{report.body}</Text>
                                                </Td>
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
