import useAspidaSWR from "@aspida/swr";
import { useRecoilValue } from "recoil";

import { ReportResponse } from "@api/@types";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

type UseOrganizationReportsResponse = {
    reports: ReportResponse[];
    error: Error;
};
export const useOrganizationReports = (organizationCode: string): UseOrganizationReportsResponse => {
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const { data, error } = useAspidaSWR(api.organizations._organizationCode(organizationCode).reports, { refreshInterval: 10 });

    return {
        reports: data && data.reports ? data.reports : [],
        error,
    };
};
