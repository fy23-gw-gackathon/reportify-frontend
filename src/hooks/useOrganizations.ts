import useAspidaSWR from "@aspida/swr";

import { OrganizationResponse } from "@api/@types";
import ApiClient from "@utils/api-client";

type UseOrganizationResponse = {
    organizations: OrganizationResponse[];
    error: Error;
};
export const useOrganizations = (): UseOrganizationResponse => {
    const organizationsClient = ApiClient.organizations;

    const { data, error } = useAspidaSWR(organizationsClient);

    return {
        organizations: data ? data.organizations : [],
        error,
    };
};
