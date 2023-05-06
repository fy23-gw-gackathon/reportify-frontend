import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { Title } from "@components/Layouts";
import { loginUserState } from "@store/user";

export default function Home() {
    const router = useRouter();

    const [loginUser] = useRecoilState(loginUserState);

    // 既にログイン済みの場合は日報リスト画面へリダイレクトする
    useEffect(() => {
        if (loginUser) {
            void router.push("/reports");
        }
    }, [router, loginUser]);

    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"HOME"}></Title>
        </VStack>
    );
}
