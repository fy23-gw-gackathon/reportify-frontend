import useAspidaSWR from "@aspida/swr";
import { useRecoilValue } from "recoil";

import { OrganizationResponse } from "@api/@types";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

type UseOrganizationResponse = {
    organizations: OrganizationResponse[];
    error: Error;
};
export const useOrganizations = (): UseOrganizationResponse => {
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);

    const { data, error } = useAspidaSWR(api.organizations);

    return {
        organizations: data ? data.organizations : [],
        error,
    };
};
