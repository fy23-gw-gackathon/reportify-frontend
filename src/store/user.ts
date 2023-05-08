import { CognitoUser } from "@aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState, AtomEffect } from "recoil";

type AuthenticatedUserState = {
    isInitialized: boolean;
    isLoading: boolean;
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

const defaultAuthenticatedUserState = { isInitialized: false, isAuthenticated: false, isLoading: false, email: "", emailVerified: false };
const loadingAuthenticatedUserState = { isInitialized: false, isAuthenticated: false, isLoading: true, email: "", emailVerified: false };

const authenticatedUserRecoilState = atom<AuthenticatedUserState>({
    key: "authenticatedUserState",
    default: defaultAuthenticatedUserState,
    effects: [localStorageEffect<AuthenticatedUserState>("addedValue")],
});

export const useAuthenticatedUserState = () => {
    const [didMount, setDidMount] = useState(false);
    const authenticatedUserState = useRecoilValue(authenticatedUserRecoilState);

    useEffect(() => {
        setDidMount(true);
    }, []);
    return didMount ? authenticatedUserState : loadingAuthenticatedUserState;
};

export const useAuthenticatedUserMutator = () => {
    const setState = useSetRecoilState(authenticatedUserRecoilState);
    const setAuthenticatedUser = useCallback(
        async (cognitoUser: CognitoUser | undefined) => {
            console.log("setAuthenticatedUser / cognitoUser:", cognitoUser);
            if (!cognitoUser)
                return setState((state) => ({
                    ...state,
                    isInitialized: true,
                    isLoading: false,
                    isAuthenticated: false,
                }));

            const attributes: { email: string; emailVerified: boolean } = await new Promise((resolve) =>
                cognitoUser.getUserAttributes((_, attributes) => {
                    console.log("getUserAttributes / attributes:", attributes);
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
                isLoading: false,
                isAuthenticated: true,
                ...attributes,
            });
        },
        [setState]
    );
    return { setAuthenticatedUser };
};
