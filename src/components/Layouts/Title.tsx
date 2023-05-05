import { Text } from "@chakra-ui/react";

type Props = {
    title: string;
};

export const Title = ({ title }: Props) => {
    return (
        <Text fontSize={"2xl"} fontWeight={"bold"}>
            {title}
        </Text>
    );
};
