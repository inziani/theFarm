export class LoginCredentials {

    constructor(
        public email: string,
        public password: string) {
    }
}

export class SignUpCredentials {

    constructor(
        public firstName: string,
        public lastName: string,
        public birthday: string,
        public phoneNumber: string,
        public username: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {

    }
}
