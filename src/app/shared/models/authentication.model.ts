export class LoginCredentials {

    constructor(
        public email: string,
        public password: string) {
    }
}

export class SignUpCredentials {

    constructor(
        public first_name: string,
        public last_name: string,
        public date_of_birth: Date,
        public phone_number: number,
        public username: string,
        public gender: string,
        public city: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {

    }
}
