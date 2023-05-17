/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    /** OK */
    resBody: Types.UsersResponse
  }

  post: {
    status: 200
    /** メンバー招待リクエスト */
    reqBody: Types.InviteUserRequest
  }
}
