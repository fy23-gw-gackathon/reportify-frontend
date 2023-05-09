import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Title } from "@components/Layouts";
import { useAuthenticatedUserState } from "@store/user";

export default function Home() {
    const router = useRouter();

    const { isAuthenticated } = useAuthenticatedUserState();

    // 既にログイン済みの場合は日報リスト画面へリダイレクトする
    useEffect(() => {
        if (isAuthenticated) {
            void router.push("/reports");
        }
    }, [router, isAuthenticated]);

    return (
        <VStack align={"start"} gap={2} w={"full"}>
            <Title title={"HOME"}></Title>
        </VStack>
    );
}
