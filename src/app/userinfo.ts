export interface User {

    uuid: string | null;
    loginName: string;
    password: string | null;
    displayName: string;
    vcsNames?: string[];
    avatarId?: string;
    contactEmail: string;
    banned: boolean;
}

export interface SimpleUser {
    uuid: string;
    displayName: string;
    avatarId?: string;

}