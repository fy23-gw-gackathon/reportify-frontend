import useAspidaSWR from "@aspida/swr";
import { useRecoilValue } from "recoil";

import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

export const useOrganizationReports = (organizationCode: string) => {
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const { data, error } = useAspidaSWR(api.organizations._organizationCode(organizationCode).reports, { refreshInterval: 10 });

    return {
        reports: data && data.reports ? data.reports : [],
        error,
    };
};
