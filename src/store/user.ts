import { CognitoUser } from "@aws-amplify/auth";
import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState, AtomEffect } from "recoil";

type AuthenticatedUserState = {
    isInitialized: boolean;
    isAuthenticated: boolean;
    email: string;
    emailVerified: boolean;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
    (key: string) =>
    ({ setSelf, onSet }) => {
        if (typeof window === "undefined") {
            return;
        }
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const defaultAuthenticatedUserState = { isInitialized: false, isAuthenticated: false, email: "", emailVerified: false };

const authenticatedUserRecoilState = atom<AuthenticatedUserState>({
    key: "authenticatedUserState",
    default: defaultAuthenticatedUserState,
    effects: [localStorageEffect<AuthenticatedUserState>("userData")],
});

export const useAuthenticatedUserState = () => {
    return useRecoilValue(authenticatedUserRecoilState);
};

export const useAuthenticatedUserMutator = () => {
    const setState = useSetRecoilState(authenticatedUserRecoilState);
    const setAuthenticatedUser = useCallback(
        async (cognitoUser: CognitoUser | undefined) => {
            if (!cognitoUser)
                return setState((state) => ({
                    ...state,
                    isInitialized: true,
                    isAuthenticated: false,
                }));

            const attributes: { email: string; emailVerified: boolean } = await new Promise((resolve) =>
                cognitoUser.getUserAttributes((_, attributes) => {
                    const { email, email_verified } = attributes
                        ? Object.fromEntries(attributes.map(({ Name, Value }) => [Name, Value]))
                        : { email: "", email_verified: false };
                    resolve({
                        email,
                        emailVerified: Boolean(email_verified),
                    });
                })
            );

            setState({
                isInitialized: true,
                isAuthenticated: true,
                ...attributes,
            });
        },
        [setState]
    );
    return { setAuthenticatedUser };
};
