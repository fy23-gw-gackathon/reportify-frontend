/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** 自分が所属する組織のみ取得できる */
  get: {
    status: 200
    /** OK */
    resBody: Types.OrganizationsResponse
  }
}
