import { getAPIClientWithAuth } from "@api/$api";

export const getReports = async () => {
    const api = await getAPIClientWithAuth();
    return await (
        await api.organizations._organizationCode("NewGraduateTraining2").reports.get()
    ).body;
};
