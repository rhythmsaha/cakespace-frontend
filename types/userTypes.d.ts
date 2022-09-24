export interface User {
    firstName: string;
    lastname: string;
    email: string;
    phone: string;
    authToken: string;
}

export interface RegistrationFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
