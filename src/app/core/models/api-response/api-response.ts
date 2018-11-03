export class ApiReponse<T = any> {
    constructor(
        public status: number,
        public payload: T = null,
        public message: string = null,
        public metadata: Object = null
    ) {}

    static success<T = any>(payload: T, message?: string, metadata?: Object) {
        return new ApiReponse<T>(200, payload, message, metadata);
    }

    static error<T = any>(payload: T, message?: string, metadata?: Object) {
        return new ApiReponse<T>(500, payload, message, metadata);
    }

    get isOK() {
        return this.status === 200 || this.status === 201;
    }
}
