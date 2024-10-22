export default interface HttpResponse<T> extends Response {
    data?: T | null;
    message?: string;
}