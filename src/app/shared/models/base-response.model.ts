export interface BaseResponse<T> {
    error: boolean;
    errorMessages: string[] | null;
    result: T;
    stackTrace: string | null;
}
