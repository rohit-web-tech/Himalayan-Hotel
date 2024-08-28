class ApiError extends Error {
    constructor(
        status,
        message = "Something went wrong!!",
        errors = []
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.success = false;
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
            success: this.success
        }
    }
}

export default ApiError;