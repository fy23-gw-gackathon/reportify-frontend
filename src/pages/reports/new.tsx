import { CheckCircleIcon, Icon, WarningIcon } from "@chakra-ui/icons";
import {
    Card,
    CardBody,
    Grid,
    GridItem,
    Text,
    HStack,
    TextProps,
    Accordion,
    AccordionPanel,
    AccordionIcon,
    AccordionItem,
    AccordionButton,
    AccordionPanelProps,
    Button,
    useToast,
    Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { BiMailSend } from "react-icons/bi";
import { useRecoilValue } from "recoil";

import { Title } from "@components/Layouts";
import { useOrganization } from "@hooks/useOrganization";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type HintType = {
    title: string;
    body: string;
    tags?: string[];
    checkFunc: (value: string) => boolean;
};

const reportHints: HintType[] = [
    {
        title: "本日の業務内容を書いているか",
        body: `自分がその日に何をしたかを具体的に書くことで、自分の業務進捗を確認し、上司やチームメートに透明性を提供します。\n
        #本日の業務内容 のように見出しを追加しましょう。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(業務|やったこと)/);
        },
        tags: ["# 本日の業務内容", "# 今日やったこと"],
    },
    {
        title: "問題や課題を明記しているか",
        body: `遭遇した問題や未解決の課題を明確に伝えることで、他のメンバーや上司からのフィードバックや支援を得られます。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(問題|課題)/);
        },
        tags: ["# 問題点", "# 課題点"],
    },
    {
        title: "次のアクションプランを書いているか",
        body: `今後どのように進めるかの予定を書くことで、自分自身の計画を明確にするとともに、他の人に自分の次のステップを理解してもらえます。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(アクション|計画|やること)/);
        },
        tags: ["# ネクストアクション", "# 明日やること", "# 次やること"],
    },
];

export default function New() {
    const { organization } = useOrganization();
    const [value, setValue] = useState("");
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const reportsClient = api.organizations._organizationCode(organization.code).reports;

    const toast = useToast({
        isClosable: true,
        position: "bottom-left",
    });

    const router = useRouter();

    const handlePost = useCallback(async () => {
        try {
            await reportsClient.post({ body: { body: value, tasks: [] } });
            toast({
                title: "成功",
                description: "投稿しました。",
                status: "success",
                duration: 3000,
            });
            await router.push("/reports");
        } catch (e) {
            toast({
                title: "失敗",
                description: `${e}`,
                status: "error",
                duration: 3000,
            });
        }
    }, [reportsClient, router, toast, value]);

    return (
        <Box as={"section"} gap={2} w={"full"}>
            <Title title={"新規投稿"}></Title>
            <Grid gap={4} templateColumns="repeat(12, 1fr)" w={"full"}>
                <GridItem colSpan={8}>
                    <MDEditor height={500} value={value} preview={"edit"} onChange={(newValue = "") => setValue(newValue)} autoFocus />
                    <HStack justifyContent={"end"} my={4}>
                        <Button
                            pr={6}
                            pl={4}
                            aria-label={"sendButton"}
                            colorScheme={"teal"}
                            isDisabled={value === ""}
                            leftIcon={<Icon as={BiMailSend} mr={2} />}
                            onClick={handlePost}
                            rounded={3}
                        >
                            送信
                        </Button>
                    </HStack>
                </GridItem>
                <GridItem colSpan={4}>
                    <Card mb={4} rounded={3}>
                        <CardBody>
                            <HintAccordion value={value} hints={reportHints} insertValue={setValue} />
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    );
}

const TextWithStatus = ({ active, ...attrs }: { active: boolean } & TextProps) => {
    return (
        <HStack>
            {active ? <CheckCircleIcon color="green" /> : <WarningIcon color="lightgray" />}
            <Text {...attrs}>{attrs.children}</Text>
        </HStack>
    );
};

const AccordionRow = ({ active = false, title, ...attrs }: { active?: boolean; title: string } & AccordionPanelProps) => {
    return (
        <AccordionItem>
            <AccordionButton w={"full"}>
                <HStack justifyContent={"space-between"} w={"full"}>
                    <TextWithStatus color={"gray"} fontSize={14} active={active}>
                        {title}
                    </TextWithStatus>
                    <AccordionIcon display={"block"} />
                </HStack>
            </AccordionButton>
            <AccordionPanel {...attrs}>{attrs.children}</AccordionPanel>
        </AccordionItem>
    );
};

const HintAccordion = ({ value, hints, insertValue }: { value: string; hints: HintType[]; insertValue: (value: string) => void }) => {
    return (
        <Accordion allowToggle>
            {hints &&
                hints.map((hint: HintType) => {
                    const isActive = hint.checkFunc(value);
                    return (
                        <AccordionRow title={hint.title} active={isActive} key={hint.title}>
                            <Text fontSize={13}>{hint.body}</Text>
                            <HStack my={2}>
                                {hint.tags &&
                                    hint.tags.map((tag) => (
                                        <Button
                                            key={tag}
                                            fontSize={10}
                                            isDisabled={isActive}
                                            onClick={() => {
                                                insertValue(`${value}\n${tag}`);
                                            }}
                                            size={"xs"}
                                        >
                                            {tag}
                                        </Button>
                                    ))}
                            </HStack>
                        </AccordionRow>
                    );
                })}
        </Accordion>
    );
};
