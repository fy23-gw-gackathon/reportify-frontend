import { Auth, CognitoUser } from "@aws-amplify/auth";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { authenticatedUserTokenRecoilState, useAuthenticatedUserMutator } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

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
                    try {
                        const api = ApiClientWithAuthToken(idToken);
                        const user = await (await api.users.me.get()).body;
                        setAuthenticatedUser({ user });
                        setIdToken({ idToken });
                    } catch (error) {
                        setAuthenticatedUser({ user: undefined });
                        console.log(error);
                    }
                } else {
                    setAuthenticatedUser({ user: undefined });
                }
            });
    }, [setAuthenticatedUser, setIdToken]);
    return <>{children}</>;
};
