import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './_reportId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8080/api/v1' : baseURL).replace(/\/$/, '')
  const PATH0 = '/reports'
  const PUT = 'PUT'

  return {
    _reportId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * @param option.body - 日報レビューリクエスト
         */
        put: (option: { body: Methods0['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods0['put']['status']>(prefix, prefix0, PUT, option).send(),
        /**
         * @param option.body - 日報レビューリクエスト
         */
        $put: (option: { body: Methods0['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods0['put']['status']>(prefix, prefix0, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
