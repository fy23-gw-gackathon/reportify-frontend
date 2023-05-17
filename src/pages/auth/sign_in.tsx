import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { CSSProperties, useEffect } from "react";

export default function SignIn() {
    const router = useRouter();
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    useEffect(() => {
        if (authStatus === "authenticated") {
            router.replace("/reports");
        }
    }, [authStatus, router]);

    return (
        <div style={fullHeightStyle}>
            <Authenticator hideSignUp />
        </div>
    );
}

const fullHeightStyle: CSSProperties = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#EDF2F7",
};
