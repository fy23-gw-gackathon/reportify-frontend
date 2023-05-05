import { dataToURLString } from "aspida";

import type { Methods as Methods0 } from "./organization/_organizationCode@string/reports/_reportId@string";
import type { Methods as Methods1 } from "./organizations";
import type { Methods as Methods2 } from "./organizations/_organizationCode@string";
import type { Methods as Methods3 } from "./organizations/_organizationCode@string/reports";
import type { Methods as Methods4 } from "./organizations/_organizationCode@string/users";
import type { AspidaClient, BasicHeaders } from "aspida";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
    const prefix = (baseURL === undefined ? "http://localhost:8080" : baseURL).replace(/\/$/, "");
    const PATH0 = "/organization";
    const PATH1 = "/reports";
    const PATH2 = "/organizations";
    const PATH3 = "/users";
    const GET = "GET";
    const POST = "POST";
    const PUT = "PUT";

    return {
        organization: {
            _organizationCode: (val1: string) => {
                const prefix1 = `${PATH0}/${val1}`;

                return {
                    reports: {
                        _reportId: (val3: string) => {
                            const prefix3 = `${prefix1}${PATH1}/${val3}`;

                            return {
                                get: (option?: { config?: T | undefined } | undefined) =>
                                    fetch<void, BasicHeaders, Methods0["get"]["status"]>(prefix, prefix3, GET, option).send(),
                                $get: (option?: { config?: T | undefined } | undefined) =>
                                    fetch<void, BasicHeaders, Methods0["get"]["status"]>(prefix, prefix3, GET, option)
                                        .send()
                                        .then((r) => r.body),
                                $path: () => `${prefix}${prefix3}`,
                            };
                        },
                    },
                };
            },
        },
        organizations: {
            _organizationCode: (val1: string) => {
                const prefix1 = `${PATH2}/${val1}`;

                return {
                    reports: {
                        /**
                         * @returns OK
                         */
                        get: (option?: { query?: Methods3["get"]["query"] | undefined; config?: T | undefined } | undefined) =>
                            fetch<Methods3["get"]["resBody"], BasicHeaders, Methods3["get"]["status"]>(
                                prefix,
                                `${prefix1}${PATH1}`,
                                GET,
                                option
                            ).json(),
                        /**
                         * @returns OK
                         */
                        $get: (option?: { query?: Methods3["get"]["query"] | undefined; config?: T | undefined } | undefined) =>
                            fetch<Methods3["get"]["resBody"], BasicHeaders, Methods3["get"]["status"]>(prefix, `${prefix1}${PATH1}`, GET, option)
                                .json()
                                .then((r) => r.body),
                        /**
                         * @returns Created
                         */
                        post: (option?: { config?: T | undefined } | undefined) =>
                            fetch<Methods3["post"]["resBody"], BasicHeaders, Methods3["post"]["status"]>(
                                prefix,
                                `${prefix1}${PATH1}`,
                                POST,
                                option
                            ).json(),
                        /**
                         * @returns Created
                         */
                        $post: (option?: { config?: T | undefined } | undefined) =>
                            fetch<Methods3["post"]["resBody"], BasicHeaders, Methods3["post"]["status"]>(prefix, `${prefix1}${PATH1}`, POST, option)
                                .json()
                                .then((r) => r.body),
                        $path: (option?: { method?: "get" | undefined; query: Methods3["get"]["query"] } | undefined) =>
                            `${prefix}${prefix1}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ""}`,
                    },
                    users: {
                        /**
                         * @returns OK
                         */
                        get: (option?: { config?: T | undefined } | undefined) =>
                            fetch<Methods4["get"]["resBody"], BasicHeaders, Methods4["get"]["status"]>(
                                prefix,
                                `${prefix1}${PATH3}`,
                                GET,
                                option
                            ).json(),
                        /**
                         * @returns OK
                         */
                        $get: (option?: { config?: T | undefined } | undefined) =>
                            fetch<Methods4["get"]["resBody"], BasicHeaders, Methods4["get"]["status"]>(prefix, `${prefix1}${PATH3}`, GET, option)
                                .json()
                                .then((r) => r.body),
                        $path: () => `${prefix}${prefix1}${PATH3}`,
                    },
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods2["get"]["resBody"], BasicHeaders, Methods2["get"]["status"]>(prefix, prefix1, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods2["get"]["resBody"], BasicHeaders, Methods2["get"]["status"]>(prefix, prefix1, GET, option)
                            .json()
                            .then((r) => r.body),
                    /**
                     * @param option.body - 組織更新リクエスト
                     */
                    put: (option: { body: Methods2["put"]["reqBody"]; config?: T | undefined }) =>
                        fetch<void, BasicHeaders, Methods2["put"]["status"]>(prefix, prefix1, PUT, option).send(),
                    /**
                     * @param option.body - 組織更新リクエスト
                     */
                    $put: (option: { body: Methods2["put"]["reqBody"]; config?: T | undefined }) =>
                        fetch<void, BasicHeaders, Methods2["put"]["status"]>(prefix, prefix1, PUT, option)
                            .send()
                            .then((r) => r.body),
                    $path: () => `${prefix}${prefix1}`,
                };
            },
            /**
             * 自分が所属する組織のみ取得できる
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1["get"]["resBody"], BasicHeaders, Methods1["get"]["status"]>(prefix, PATH2, GET, option).json(),
            /**
             * 自分が所属する組織のみ取得できる
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1["get"]["resBody"], BasicHeaders, Methods1["get"]["status"]>(prefix, PATH2, GET, option)
                    .json()
                    .then((r) => r.body),
            $path: () => `${prefix}${PATH2}`,
        },
    };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
