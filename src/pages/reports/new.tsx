import { CheckCircleIcon, Icon, QuestionOutlineIcon, WarningIcon } from "@chakra-ui/icons";
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
    Heading,
    useColorMode,
} from "@chakra-ui/react";
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
import { markdownIt } from "@utils/markdown";

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false,
});

type HintType = {
    title: string;
    body: string;
    tags?: string[];
    checkFunc: (value: string) => boolean;
    checkWordCount: (value: string) => number;
    requiredWordCount: number;
};

const countSectionWordLength = (value: string, regex: RegExp): number => {
    const pos = value.search(regex);
    const trimmedValue = value.split("").slice(pos).join("");
    const sections = trimmedValue.split(/#/).filter((section) => section !== "");
    if (sections.length === 0) {
        return 0;
    }
    const sectionContents = sections[0].split("\n");
    if (sectionContents.length < 1) {
        return 0;
    }
    return sectionContents
        .splice(1)
        .join("")
        .replaceAll(/[\s\u{3000}]/gu, "").length;
};

const reportHints: HintType[] = [
    {
        title: "本日の業務内容を書いているか",
        body: `自分がその日に何をしたかを具体的に書くことで、自分の業務進捗を確認し、上司やチームメートに透明性を提供します。\n
        #本日の業務内容 のように見出しを追加しましょう。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(業務|やったこと)/);
        },
        checkWordCount: (value: string) => {
            const regex = /#.+(業務|やったこと).*\n/;
            return countSectionWordLength(value, regex);
        },
        tags: ["# 本日の業務内容", "# 今日やったこと"],
        requiredWordCount: 120,
    },
    {
        title: "問題や課題を明記しているか",
        body: `遭遇した問題や未解決の課題を明確に伝えることで、他のメンバーや上司からのフィードバックや支援を得られます。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(問題|課題)/);
        },
        checkWordCount: (value: string) => {
            const regex = /#.+(問題|課題).*\n/;
            return countSectionWordLength(value, regex);
        },
        tags: ["# 問題点", "# 課題点"],
        requiredWordCount: 120,
    },
    {
        title: "次のアクションプランを書いているか",
        body: `今後どのように進めるかの予定を書くことで、自分自身の計画を明確にするとともに、他の人に自分の次のステップを理解してもらえます。`,
        checkFunc: (value: string) => {
            return !!value.match(/#.+(アクション|計画|やること)/);
        },
        checkWordCount: (value: string) => {
            const regex = /#.+(アクション|計画|やること).*\n/;
            return countSectionWordLength(value, regex);
        },
        tags: ["# ネクストアクション", "# 明日やること", "# 次やること"],
        requiredWordCount: 80,
    },
];

export default function New() {
    const { organization } = useOrganization();
    const [value, setValue] = useState("");
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const reportsClient = api.organizations._organizationCode(organization.code).reports;
    const { colorMode } = useColorMode();
    const toast = useToast({
        isClosable: true,
        position: "bottom-left",
    });

    const router = useRouter();
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
                    <Card h={500} shadow={"none"}>
                        <MarkdownEditor
                            className={colorMode === "dark" ? "markdown-body-dark" : "markdown-body"}
                            style={{ height: "500px", borderRadius: "3px", backgroundColor: "inherit", color: "black" }}
                            renderHTML={(text) => markdownIt.render(text)}
                            view={{ menu: true, md: true, html: false }}
                            canView={{ menu: true, md: true, html: true, both: true, fullScreen: true, hideMenu: true }}
                            value={value}
                            autoFocus={false}
                            onChange={({ text }) => setValue(text)}
                        />
                    </Card>
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
                            <HStack justifyContent={"center"} mb={4}>
                                <QuestionOutlineIcon />
                                <Heading size={"sm"}>良い日報を書くためのヒント</Heading>
                            </HStack>
                            <HintAccordion value={value} hints={reportHints} insertValue={setValue} />
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    );
}

const TextWithStatus = ({ active, overRequiredCount, ...attrs }: { active: boolean; overRequiredCount: boolean } & TextProps) => {
    return (
        <HStack>
            {active ? overRequiredCount ? <CheckCircleIcon color="green" /> : <WarningIcon color="orange" /> : <WarningIcon color="lightgray" />}
            <Text {...attrs}>{attrs.children}</Text>
        </HStack>
    );
};

const AccordionRow = ({
    active = false,
    overRequiredCount = false,
    title,
    ...attrs
}: { active?: boolean; overRequiredCount?: boolean; title: string } & AccordionPanelProps) => {
    return (
        <AccordionItem>
            <AccordionButton w={"full"}>
                <HStack justifyContent={"space-between"} w={"full"}>
                    <TextWithStatus color={active ? "black" : "gray"} fontSize={14} active={active} overRequiredCount={overRequiredCount}>
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
                    const wordCount = hint.checkWordCount(value);
                    return (
                        <AccordionRow title={hint.title} active={isActive} key={hint.title} overRequiredCount={wordCount >= hint.requiredWordCount}>
                            <Text fontSize={13}>{hint.body}</Text>
                            <HStack my={2}>
                                {hint.tags &&
                                    hint.tags.map((tag) => (
                                        <Tooltip key={tag} px={2} fontSize={12} hasArrow isDisabled={isActive} label={`${tag}を追加`} rounded={3}>
                                            <Button
                                                fontSize={10}
                                                isDisabled={isActive}
                                                onClick={() => {
                                                    insertValue(`${value}\n${tag}\n- `);
                                                }}
                                                size={"xs"}
                                            >
                                                {tag}
                                            </Button>
                                        </Tooltip>
                                    ))}
                            </HStack>
                            <Text
                                mt={6}
                                color={isActive ? (wordCount >= hint.requiredWordCount ? "green" : "orange") : "gray"}
                                fontSize={13}
                                textAlign={"right"}
                            >{`推奨${hint.requiredWordCount}文字 (${wordCount}/${hint.requiredWordCount})`}</Text>
                        </AccordionRow>
                    );
                })}
        </Accordion>
    );
};
