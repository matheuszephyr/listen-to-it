export interface ServiceResponse{
    statusCode: ResponseCode,
    message: string,
    result?: any
}

export enum ResponseCode{
    OK = 200,
    InternalServerError = 500,
    BadRequest = 400,
    NotFound = 404,
    Unauthorized = 401,
    Forbidden = 403
}