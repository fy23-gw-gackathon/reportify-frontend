import { atom } from "recoil";

import { OrganizationResponse } from "@api/@types";

export const activatedOrganizationState = atom<OrganizationResponse>({
    key: "activatedOrganizationState",
    default: {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "技術統括部エンジニアリング室新卒研修",
        code: "fy23-eng-training",
        mvv: {
            mission: "",
            vision: "",
            value: "",
        },
    },
});
