import useAspidaSWR from "@aspida/swr";
import { useRecoilValue } from "recoil";

import { ReportResponse } from "@api/@types";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

type UseOrganizationReportResponse = {
    report: ReportResponse;
    error: Error;
};

export const useOrganizationReport = (organizationCode: string, reportId: string): UseOrganizationReportResponse => {
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const { data, error } = useAspidaSWR(api.organizations._organizationCode(organizationCode).reports._reportId(reportId));
    return {
        report: data as ReportResponse,
        error,
    };
};
