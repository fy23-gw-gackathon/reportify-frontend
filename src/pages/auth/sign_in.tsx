import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn() {
    const router = useRouter();
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    useEffect(() => {
        if (authStatus === "authenticated") {
            router.replace("/reports");
        }
    }, [authStatus, router]);

    return <Authenticator hideSignUp />;
}
