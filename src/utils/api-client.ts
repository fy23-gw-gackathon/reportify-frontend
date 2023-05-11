import aspida from "@aspida/axios";
import axios from "axios";

import api from "@api/$api";

// TODO: エラーレスポンスが返ってきた場合にToastを表示したい
// https://stackoverflow.com/questions/55149816/is-it-possible-to-use-toast-in-axios-interceptors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const response = error.response.data;
        const message = response.message ? response.message : "予期せぬエラーが発生しました。";

        return Promise.reject(message);
    }
);

export const ApiClientWithAuthToken = (idToken: string | undefined) => api(aspida(axios, { headers: { Authorization: `Bearer ${idToken}` } }));

const ApiClient = api(aspida(axios, {}));
export default ApiClient;
