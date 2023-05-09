import { Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
    icon: JSX.Element | undefined;
    label: string;
    href: string;
};

export const LinkButton = ({ icon, label, href }: Props) => {
    return (
        <NextLink href={href}>
            <Button colorScheme="teal" leftIcon={icon} rounded={3} variant={"outline"}>
                <Text pt={0.5} fontWeight={"normal"}>
                    {label}
                </Text>
            </Button>
        </NextLink>
    );
};
