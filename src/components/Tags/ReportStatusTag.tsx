import { Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
import { IoMdThumbsUp } from "react-icons/io";

import { ReportResponse } from "@api/@types";

export const ReportStatusTag = ({ report }: { report: ReportResponse }) => {
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
