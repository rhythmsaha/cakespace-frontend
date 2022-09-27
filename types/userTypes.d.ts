export interface User {
  firstName: string;
  lastname: string;
  email: string;
}

export interface RegistrationFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFields {
  email: string;
  password: string;
  remember: boolean;
}
