import { dataToURLString } from "aspida";

import type { Methods as Methods0 } from ".";
import type { Methods as Methods1 } from "./_organizationCode@string";
import type { Methods as Methods2 } from "./_organizationCode@string/reports";
import type { Methods as Methods3 } from "./_organizationCode@string/users";
import type { Methods as Methods4 } from "./_organizationCode@string/users/_userId@string";
import type { AspidaClient, BasicHeaders } from "aspida";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
    const prefix = (baseURL === undefined ? "http://localhost:8080" : baseURL).replace(/\/$/, "");
    const PATH0 = "/organizations";
    const PATH1 = "/reports";
    const PATH2 = "/users";
    const GET = "GET";
    const POST = "POST";
    const PUT = "PUT";
    const DELETE = "DELETE";

    return {
        _organizationCode: (val0: string) => {
            const prefix0 = `${PATH0}/${val0}`;

            return {
                reports: {
                    /**
                     * @returns OK
                     */
                    get: (option?: { query?: Methods2["get"]["query"] | undefined; config?: T | undefined } | undefined) =>
                        fetch<Methods2["get"]["resBody"], BasicHeaders, Methods2["get"]["status"]>(prefix, `${prefix0}${PATH1}`, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { query?: Methods2["get"]["query"] | undefined; config?: T | undefined } | undefined) =>
                        fetch<Methods2["get"]["resBody"], BasicHeaders, Methods2["get"]["status"]>(prefix, `${prefix0}${PATH1}`, GET, option)
                            .json()
                            .then((r) => r.body),
                    /**
                     * @returns Created
                     */
                    post: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods2["post"]["resBody"], BasicHeaders, Methods2["post"]["status"]>(
                            prefix,
                            `${prefix0}${PATH1}`,
                            POST,
                            option
                        ).json(),
                    /**
                     * @returns Created
                     */
                    $post: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods2["post"]["resBody"], BasicHeaders, Methods2["post"]["status"]>(prefix, `${prefix0}${PATH1}`, POST, option)
                            .json()
                            .then((r) => r.body),
                    $path: (option?: { method?: "get" | undefined; query: Methods2["get"]["query"] } | undefined) =>
                        `${prefix}${prefix0}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ""}`,
                },
                users: {
                    _userId: (val2: string) => {
                        const prefix2 = `${prefix0}${PATH2}/${val2}`;

                        return {
                            /**
                             * @param option.body - ユーザーロール更新リクエスト
                             */
                            put: (option: { body: Methods4["put"]["reqBody"]; config?: T | undefined }) =>
                                fetch<void, BasicHeaders, Methods4["put"]["status"]>(prefix, prefix2, PUT, option).send(),
                            /**
                             * @param option.body - ユーザーロール更新リクエスト
                             */
                            $put: (option: { body: Methods4["put"]["reqBody"]; config?: T | undefined }) =>
                                fetch<void, BasicHeaders, Methods4["put"]["status"]>(prefix, prefix2, PUT, option)
                                    .send()
                                    .then((r) => r.body),
                            delete: (option?: { config?: T | undefined } | undefined) =>
                                fetch<void, BasicHeaders, Methods4["delete"]["status"]>(prefix, prefix2, DELETE, option).send(),
                            $delete: (option?: { config?: T | undefined } | undefined) =>
                                fetch<void, BasicHeaders, Methods4["delete"]["status"]>(prefix, prefix2, DELETE, option)
                                    .send()
                                    .then((r) => r.body),
                            $path: () => `${prefix}${prefix2}`,
                        };
                    },
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods3["get"]["resBody"], BasicHeaders, Methods3["get"]["status"]>(prefix, `${prefix0}${PATH2}`, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods3["get"]["resBody"], BasicHeaders, Methods3["get"]["status"]>(prefix, `${prefix0}${PATH2}`, GET, option)
                            .json()
                            .then((r) => r.body),
                    /**
                     * @param option.body - メンバー招待リクエスト
                     */
                    post: (option: { body: Methods3["post"]["reqBody"]; config?: T | undefined }) =>
                        fetch<void, BasicHeaders, Methods3["post"]["status"]>(prefix, `${prefix0}${PATH2}`, POST, option).send(),
                    /**
                     * @param option.body - メンバー招待リクエスト
                     */
                    $post: (option: { body: Methods3["post"]["reqBody"]; config?: T | undefined }) =>
                        fetch<void, BasicHeaders, Methods3["post"]["status"]>(prefix, `${prefix0}${PATH2}`, POST, option)
                            .send()
                            .then((r) => r.body),
                    $path: () => `${prefix}${prefix0}${PATH2}`,
                },
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods1["get"]["resBody"], BasicHeaders, Methods1["get"]["status"]>(prefix, prefix0, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods1["get"]["resBody"], BasicHeaders, Methods1["get"]["status"]>(prefix, prefix0, GET, option)
                        .json()
                        .then((r) => r.body),
                /**
                 * @param option.body - 組織更新リクエスト
                 */
                put: (option: { body: Methods1["put"]["reqBody"]; config?: T | undefined }) =>
                    fetch<void, BasicHeaders, Methods1["put"]["status"]>(prefix, prefix0, PUT, option).send(),
                /**
                 * @param option.body - 組織更新リクエスト
                 */
                $put: (option: { body: Methods1["put"]["reqBody"]; config?: T | undefined }) =>
                    fetch<void, BasicHeaders, Methods1["put"]["status"]>(prefix, prefix0, PUT, option)
                        .send()
                        .then((r) => r.body),
                $path: () => `${prefix}${prefix0}`,
            };
        },
        /**
         * 自分が所属する組織のみ取得できる
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0["get"]["resBody"], BasicHeaders, Methods0["get"]["status"]>(prefix, PATH0, GET, option).json(),
        /**
         * 自分が所属する組織のみ取得できる
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0["get"]["resBody"], BasicHeaders, Methods0["get"]["status"]>(prefix, PATH0, GET, option)
                .json()
                .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
    };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
