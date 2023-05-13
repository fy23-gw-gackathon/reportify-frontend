import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState, AtomEffect } from "recoil";

type AuthenticatedUserType =
    | {
          /** ユーザID */
          id: string;
          /** ユーザ名 */
          name: string;
          /** メールアドレス */
          email: string;
          /** 所属する組織リスト */
          organizations: {
              id: string;
              /** ロール */
              is_admin: boolean;
          }[];
      }
    | undefined;

type AuthenticatedUserState = {
    user: AuthenticatedUserType;
};

type AuthenticatedUserTokenState = {
    idToken: string | undefined;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
    (key: string) =>
    ({ setSelf, onSet }) => {
        if (typeof window === "undefined") {
            return;
        }
        const savedValue = localStorage.getItem(key);

        if (savedValue) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const authenticatedUserRecoilState = atom<AuthenticatedUserState>({
    key: "authenticatedUserState",
    default: { user: undefined },
    effects: [localStorageEffect<AuthenticatedUserState>("userData")],
});

export const useAuthenticatedUserState = () => {
    return useRecoilValue(authenticatedUserRecoilState);
};

export const useAuthenticatedUserMutator = () => {
    const setState = useSetRecoilState(authenticatedUserRecoilState);
    const setAuthenticatedUser = useCallback(
        (state: AuthenticatedUserState) => {
            setState(state);
        },
        [setState]
    );
    return { setAuthenticatedUser };
};

export const authenticatedUserTokenRecoilState = atom<AuthenticatedUserTokenState>({
    key: "authenticatedUserTokenRecoilState",
    default: { idToken: undefined },
});
