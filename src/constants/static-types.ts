export type StatusCodeSuccess = 200 | 204

export type StatusCodeFailure = 400 | 401 | 403 | 404 | 422 | 500 | 503

export type StatusCode = StatusCodeSuccess | StatusCodeFailure
