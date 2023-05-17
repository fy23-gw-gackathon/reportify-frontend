/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** ユーザID */
      userId?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.ReportsResponse
  }

  post: {
    status: 201
    reqBody: Types.CreateReportRequest
  }
}
