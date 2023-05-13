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
    Tooltip,
    useBoolean,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { useRecoilValue } from "recoil";

import "react-markdown-editor-lite/lib/index.css";
import { Title } from "@components/Layouts";
import { useOrganization } from "@hooks/useOrganization";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false,
});

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
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [isLoading, setLoading] = useBoolean(false);

    const handlePost = useCallback(async () => {
        try {
            setLoading.on();
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
        } finally {
            setLoading.off();
        }
    }, [reportsClient, router, setLoading, toast, value]);

    return (
        <Box as={"section"} gap={2} w={"full"}>
            <Title title={"新規投稿"}></Title>
            <Grid gap={4} templateColumns="repeat(12, 1fr)" w={"full"} my={4}>
                <GridItem colSpan={8}>
                    <Box h={500}>
                        <MarkdownEditor
                            style={{ height: "500px", borderRadius: "3px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            view={{ menu: true, md: true, html: false }}
                            canView={{ menu: true, md: true, html: true, both: true, fullScreen: true, hideMenu: true }}
                            value={value}
                            autoFocus={false}
                            onChange={({ text }) => setValue(text)}
                        />
                    </Box>
                    <HStack justifyContent={"end"} my={4}>
                        <Button
                            pr={6}
                            pl={4}
                            aria-label={"sendButton"}
                            colorScheme={"teal"}
                            isDisabled={value === ""}
                            isLoading={isLoading}
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
                    <TextWithStatus color={active ? "black" : "gray"} fontSize={14} active={active}>
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
                                        <Tooltip key={tag} px={2} fontSize={12} hasArrow isDisabled={isActive} label={`${tag}を追加`} rounded={3}>
                                            <Button
                                                fontSize={10}
                                                isDisabled={isActive}
                                                onClick={() => {
                                                    insertValue(`${value}\n${tag}`);
                                                }}
                                                size={"xs"}
                                            >
                                                {tag}
                                            </Button>
                                        </Tooltip>
                                    ))}
                            </HStack>
                        </AccordionRow>
                    );
                })}
        </Accordion>
    );
};
