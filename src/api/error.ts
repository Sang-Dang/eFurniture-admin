export class ApiError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiError'
        console.error(message)
    }
}

export class NoDataError extends ApiError {
    constructor(message: string) {
        super(message)
        this.name = 'NoDataError'
    }
}

export class InvalidIdError extends ApiError {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidIdError'
    }
}
