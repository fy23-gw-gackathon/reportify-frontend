import { Auth, CognitoUser } from "@aws-amplify/auth";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { authenticatedUserTokenRecoilState, useAuthenticatedUserMutator } from "@store/user";

type Props = {
    children: ReactNode;
};

export const _AuthProvider = ({ children }: Props) => {
    const { setAuthenticatedUser } = useAuthenticatedUserMutator();
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    const setIdToken = useSetRecoilState(authenticatedUserTokenRecoilState);
    const router = useRouter();
    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .catch((error) => {
                console.log(error);
                return undefined;
            })
            .then(async (cognitoUser: CognitoUser | undefined) => {
                if (cognitoUser) {
                    const idToken = await cognitoUser.getSignInUserSession()?.getIdToken().getJwtToken();
                    setIdToken({ idToken });
                }
                setAuthenticatedUser(cognitoUser);
                if (!cognitoUser) {
                    router.replace("/auth/sign_in");
                }
            });
    }, [setAuthenticatedUser, authStatus, setIdToken]);
    return <>{children}</>;
};

export const AuthProvider = ({ children }: Props) => {
    return (
        <Authenticator.Provider>
            <_AuthProvider>{children}</_AuthProvider>
        </Authenticator.Provider>
    );
};
