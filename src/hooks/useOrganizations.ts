import useAspidaSWR from "@aspida/swr";
import { useRecoilValue } from "recoil";

import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

export const useOrganizations = () => {
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const { data, error } = useAspidaSWR(api.organizations, { refreshInterval: 10 });
    return {
        organizations: data ? data.organizations : [],
        error,
    };
};
