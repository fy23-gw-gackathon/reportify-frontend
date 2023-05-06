import { atom } from "recoil";

import { UserResponse } from "@api/@types";

export const loginUserState = atom<UserResponse | undefined>({
    key: "loginUserState",
    default: {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "Your Name",
        email: "your_name@example.com",
        organizations: [],
    },
});
