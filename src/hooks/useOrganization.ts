import useAspidaSWR from "@aspida/swr";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { activatedOrganizationState, getStoredActivatedOrganizationCode } from "@store/organization";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

type UseOrganizationResponse = {
    organization: OrganizationResponse | undefined;
    updateOrganization: (organizationId: string, body: UpdateOrganizationRequest) => Promise<void>;
};
export const useOrganization = (): UseOrganizationResponse => {
    const [activatedOrganization, setActivatedOrganization] = useRecoilState(activatedOrganizationState);
    // const { setActivatedOrganization } = useActivatedOrganizationMutator();
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const organizationsClient = api.organizations;
    const orgCode = activatedOrganization ? activatedOrganization.code : getStoredActivatedOrganizationCode();
    const organizationClient = api.organizations._organizationCode(orgCode ?? "invalid");

    const { data, error } = useAspidaSWR(organizationClient);

    useEffect(() => {
        if (data && !error) {
            setActivatedOrganization(data);
        }
    }, [data, error, setActivatedOrganization]);

    const updateOrganization = async (organizationCode: string, body: UpdateOrganizationRequest): Promise<void> => {
        return await organizationsClient
            ._organizationCode(organizationCode)
            .$put({ body })
            .then((organization: OrganizationResponse) => {
                setActivatedOrganization(organization);
            });
    };

    return {
        organization: activatedOrganization,
        updateOrganization,
    };
};
