import type { UserDocument } from "../documents/UserDocument.ts";
import type { AuthUser } from "../AuthUserType.ts";

export interface UserInterface {
    user: UserDocument;
    authUser: AuthUser;
}
