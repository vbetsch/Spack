export interface OriginalAuthUser {
    uid: string;
    email: string;
    createdAt: string;
    lastLoginAt: string;
}

export interface AuthUser {
    uid: string;
    email: string;
    createdAt: Date;
    lastLoginAt: Date;
}
