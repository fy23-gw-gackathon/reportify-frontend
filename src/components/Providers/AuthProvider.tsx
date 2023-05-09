import { Auth, CognitoUser } from "@aws-amplify/auth";
import { ReactNode, useEffect } from "react";

import { useAuthenticatedUserMutator } from "@store/user";

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const { setAuthenticatedUser } = useAuthenticatedUserMutator();

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .catch((error) => {
                console.log(error);
                return undefined;
            })
            .then((cognitoUser: CognitoUser | undefined) => {
                setAuthenticatedUser(cognitoUser);
            });
    }, [setAuthenticatedUser]);
    return <>{children}</>;
};
