import { Auth, CognitoUser } from "@aws-amplify/auth";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { authenticatedUserTokenRecoilState, useAuthenticatedUserMutator } from "@store/user";

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const { setAuthenticatedUser } = useAuthenticatedUserMutator();
    const setIdToken = useSetRecoilState(authenticatedUserTokenRecoilState);

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
            });
    }, [setAuthenticatedUser]);
    return <>{children}</>;
};
