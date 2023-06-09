import type { Methods as Methods0 } from "./me";
import type { AspidaClient, BasicHeaders } from "aspida";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
    const prefix = (baseURL === undefined ? "http://localhost:8080/api/v1" : baseURL).replace(/\/$/, "");
    const PATH0 = "/users/me";
    const GET = "GET";

    return {
        me: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods0["get"]["resBody"], BasicHeaders, Methods0["get"]["status"]>(prefix, PATH0, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods0["get"]["resBody"], BasicHeaders, Methods0["get"]["status"]>(prefix, PATH0, GET, option)
                    .json()
                    .then((r) => r.body),
            $path: () => `${prefix}${PATH0}`,
        },
    };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
