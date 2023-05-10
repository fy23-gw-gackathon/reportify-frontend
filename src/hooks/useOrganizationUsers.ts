import useAspidaSWR from "@aspida/swr";

import { InviteUserRequest, UpdateUserRoleRequest, UserResponse } from "@api/@types";
import ApiClient from "@utils/api-client";

type UseOrganizationUsersResponse = {
    users: UserResponse[];
    error: Error;
    mutate: () => void;
    inviteUser: (body: InviteUserRequest) => Promise<void>;
    updateUserRole: (userId: string, body: UpdateUserRoleRequest) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
};
export const useOrganizationUsers = (organizationCode: string): UseOrganizationUsersResponse => {
    const organizationsUsersClient = ApiClient.organizations._organizationCode(organizationCode).users;

    const { data, error, mutate } = useAspidaSWR(organizationsUsersClient);

    const inviteUser = async (body: InviteUserRequest) => {
        return await organizationsUsersClient.$post({ body }).then(() => {
            mutate();
        });
    };

    const updateUserRole = async (userId: string, body: UpdateUserRoleRequest) => {
        const userClient = organizationsUsersClient._userId(userId);
        return await userClient.$put({ body }).then(() => {
            mutate();
        });
    };

    const deleteUser = async (userId: string) => {
        const userClient = organizationsUsersClient._userId(userId);
        return await userClient.$delete().then(() => {
            mutate();
        });
    };

    return {
        users: data ? data.users : [],
        error,
        mutate,
        inviteUser,
        updateUserRole,
        deleteUser,
    };
};
