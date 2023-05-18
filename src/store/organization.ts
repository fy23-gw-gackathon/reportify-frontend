import { useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";

import { OrganizationResponse } from "@api/@types";

export const activatedOrganizationState = atom<OrganizationResponse | undefined>({
    key: "activatedOrganizationState",
    default: undefined,
});

export const getStoredActivatedOrganizationCode = () => localStorage.getItem("activatedOrganizationCode");

export const useActivatedOrganizationMutator = () => {
    const setState = useSetRecoilState(activatedOrganizationState);
    const setActivatedOrganization = useCallback(
        (state: OrganizationResponse) => {
            setState(state);
            localStorage.setItem("activatedOrganizationCode", state.code);
        },
        [setState]
    );
    return { setActivatedOrganization };
};
