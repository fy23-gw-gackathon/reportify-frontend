import { atom } from "recoil";

import { OrganizationResponse } from "@api/@types";

export const activatedOrganizationState = atom<OrganizationResponse>({
    key: "activatedOrganizationState",
    default: {
        id: "xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "技術統括部エンジニアリング室新卒研修",
        code: "fy23-eng-training",
        mvv: {
            mission: "一人ひとりに想像を超えるDelightを",
            vision:
                "DeNAは、インターネットやAIを自在に駆使しながら\n" +
                "一人ひとりの人生を豊かにするエンターテインメント領域と\n" +
                "日々の生活を営む空間と時間をより快適にする社会課題領域の\n" +
                "両軸の事業を展開するユニークな特性を生かし\n" +
                "挑戦心豊かな社員それぞれの個性を余すことなく発揮することで\n" +
                "世界に通用する新しいDelightを提供し続けます",
            value: "DeNA Promise",
        },
    },
});
