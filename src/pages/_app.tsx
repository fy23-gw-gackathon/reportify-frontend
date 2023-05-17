import "@styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth, Amplify } from "aws-amplify";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";

import { Layout } from "@components/Layouts/Layout";
import { AuthProvider } from "@components/Providers";
import "@styles/github-markdown-light.css";
import "@styles/github-markdown-dark.css";

const authConfig = {
    aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
    aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
};

Amplify.configure(authConfig);
Auth.configure(authConfig);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <AuthProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthProvider>
            </ChakraProvider>
        </RecoilRoot>
    );
}
