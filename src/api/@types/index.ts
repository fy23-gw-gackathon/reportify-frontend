/* eslint-disable */
/** 日報レスポンス */
export type ReportResponse = {
    /** 日報レスポンス */
    id: string;
    /** ユーザID */
    userId: string;
    /** 本文 */
    body: string | null;
    /** レビュー本文 */
    reviewBody: string;
    /** 実施したタスクリスト */
    tasks: Task[];
};

/** 日報リストレスポンス */
export type ReportsResponse = {
    /** 日報リスト */
    reports: ReportResponse[];
};

/** 組織レスポンス */
export type OrganizationResponse = {
    /** 組織ID */
    id: string;
    /** 組織名 */
    name: string;
    /** 組織コード */
    code: string;
    mvv: MvvResponse;
};

/** MVVレスポンス */
export type MvvResponse = {
    /** ミッション */
    mission: string;
    /** ビジョン */
    vision: string;
    /** バリュー */
    value: string;
};

/** 組織更新リクエスト */
export type UpdateOrganizationRequest = {
    /** 組織名 */
    name: string;
    /** 組織コード */
    code: string;
    /** ミッション */
    mission: string;
    /** ビジョン */
    vision: string;
    /** バリュー */
    value: string;
};

/** 日報作成リクエスト */
export type CreateReportRequest = {
    /** 本文 */
    body: string;
    /** 実施したタスクリスト */
    tasks: Task[];
};

/** 実施したタスク */
export type Task = {
    /** タスク名 */
    name: string;
    /** 開始日時 */
    startedAt: string;
    /** 終了日時 */
    finishedAt: string;
};

/** ユーザレスポンス */
export type UserResponse = {
    /** ユーザID */
    id: string;
    /** ユーザ名 */
    name: string;
    /** メールアドレス */
    email: string;
    /** 所属する組織リスト */
    organizations: UserOrganization[];
};

/** 組織リストレスポンス */
export type OrganizationsResponse = {
    /** 組織リスト */
    organizations: OrganizationsResponse[];
};

/** ユーザリストレスポンス */
export type UsersResponse = {
    /** ユーザリスト */
    users: UserResponse[];
};

/** ユーザが所属する組織 */
export type UserOrganization = {
    /** 組織ID */
    id: string;
    /** ロール */
    is_admin: boolean;
};
