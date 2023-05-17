/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** OK */
    resBody: Types.OrganizationResponse
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.OrganizationResponse
    /** 組織更新リクエスト */
    reqBody: Types.UpdateOrganizationRequest
  }
}
