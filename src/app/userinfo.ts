export interface User {

    uuid: string;
    loginName: string;
    displayName: string;
    vcsNames: string[];
    avatarId: string;
    contactEmail: string;
    banned: boolean;
}

export interface SimpleUser {
    uuid: string;
    displayName: string;
    avatarId: string;

}