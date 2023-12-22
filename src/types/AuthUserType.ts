import {Timestamp} from "firebase/firestore";

export interface AuthUser {
    uid: string;
    email: string;
    createdAt: Timestamp;
    lastLoginAt: Timestamp;
}
