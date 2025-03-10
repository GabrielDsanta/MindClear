

export interface SignInVariables {
    email: string;
    password: string;
}

export interface SignUpVariables {
    email: string;
    password: string;
    name: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}