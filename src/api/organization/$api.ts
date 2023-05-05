import type { Methods as Methods0 } from "./_organizationCode@string/reports/_reportId@string";
import type { AspidaClient, BasicHeaders } from "aspida";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
    const prefix = (baseURL === undefined ? "http://localhost:8080" : baseURL).replace(/\/$/, "");
    const PATH0 = "/organization";
    const PATH1 = "/reports";
    const GET = "GET";

    return {
        _organizationCode: (val0: string) => {
            const prefix0 = `${PATH0}/${val0}`;

            return {
                reports: {
                    _reportId: (val2: string) => {
                        const prefix2 = `${prefix0}${PATH1}/${val2}`;

                        return {
                            get: (option?: { config?: T | undefined } | undefined) =>
                                fetch<void, BasicHeaders, Methods0["get"]["status"]>(prefix, prefix2, GET, option).send(),
                            $get: (option?: { config?: T | undefined } | undefined) =>
                                fetch<void, BasicHeaders, Methods0["get"]["status"]>(prefix, prefix2, GET, option)
                                    .send()
                                    .then((r) => r.body),
                            $path: () => `${prefix}${prefix2}`,
                        };
                    },
                },
            };
        },
    };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
