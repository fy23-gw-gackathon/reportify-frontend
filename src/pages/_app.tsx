import "@styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import { translations } from "@aws-amplify/ui-react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth, Amplify, I18n } from "aws-amplify";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";

import { Layout } from "@components/Layouts/Layout";
import { AuthProvider } from "@components/Providers";

const authConfig = {
    aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
    aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
};

I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabulariesForLanguage("ja", {
    "Sign in": "ログイン", // Button label
    "Enter your Username": "メールアドレスを入力してください",
    Username: "メールアドレス", // Username label
    Password: "パスワード", // Password label
});

Amplify.configure(authConfig);
Auth.configure(authConfig);

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <RecoilRoot>
            <AuthProvider>
                {router.pathname === "/auth/sign_in" ? (
                    <Component {...pageProps} />
                ) : (
                    <ChakraProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                )}
            </AuthProvider>
        </RecoilRoot>
    );
}
