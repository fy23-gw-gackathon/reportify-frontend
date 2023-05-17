import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { localStorageEffect } from "@utils/local-storage";

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
