import { getAPIClientWithAuth } from "@api/$api";

export const getReports = async (organizationCode: string) => {
    const api = await getAPIClientWithAuth();
    return await (
        await api.organizations._organizationCode(organizationCode).reports.get()
    ).body;
};
