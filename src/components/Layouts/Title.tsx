import { Heading } from "@chakra-ui/react";

type Props = {
    title: string;
};

export const Title = ({ title }: Props) => {
    return <Heading fontSize={"2xl"}>{title}</Heading>;
};
