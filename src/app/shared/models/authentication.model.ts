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
        public birthday: Date,
        public phoneNumber: number,
        public username: string,
        public gender: string,
        public city: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {

    }
}
