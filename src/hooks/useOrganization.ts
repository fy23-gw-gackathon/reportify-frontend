import { useRecoilState, useRecoilValue } from "recoil";

import { OrganizationResponse, UpdateOrganizationRequest } from "@api/@types";
import { activatedOrganizationState } from "@store/organization";
import { authenticatedUserTokenRecoilState } from "@store/user";
import { ApiClientWithAuthToken } from "@utils/api-client";

type UseOrganizationResponse = {
    organization: OrganizationResponse;
    updateOrganization: (organizationId: string, body: UpdateOrganizationRequest) => Promise<void>;
};
export const useOrganization = (): UseOrganizationResponse => {
    const [activatedOrganization, setActivatedOrganization] = useRecoilState(activatedOrganizationState);
    const userTokenState = useRecoilValue(authenticatedUserTokenRecoilState);
    const api = ApiClientWithAuthToken(userTokenState.idToken);
    const organizationsClient = api.organizations;

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
