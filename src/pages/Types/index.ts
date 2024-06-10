import { OutputFileEntry } from "@uploadcare/blocks";
import { User } from "firebase/auth";

export interface UserLogIn {
    email: string;
    password: string;
}

export interface UserSignIn {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FileEntry {
    files: OutputFileEntry<'success'>[];
}

export interface Post {
    date: Date;
    likes: number;
    photos: PhotoMeta[];
    userId: string | null;
    caption: string;
    userlikes: [];
    username?: string;
    photoURL?: string;
    emailUser?: string;
    usersave?: string[];
}

export interface PhotoMeta {
    cdnUrl: string;
    uuid: string;
}

export interface DocumentResponse {
    id?: string;
    date?: Date;
    likes?: number;
    photos?: PhotoMeta[];
    userId?: string | null;
    caption?: string;
    userlikes?: [];
    username?: string;
    emailUser?: string;
    photoURL?: string;
    usersave?: string[];
}

export interface ProfileInfo {
    user?: User;
    displayName?: string;
    photoURl?: string;
    bio?: string;
    userFollowing?: string[];
    userFollowers?: string[];
}

export interface userProfile {
    userId?: string;
    displayName?: string;
    photoURL?: string;
    bio?: string;
    userFollowing?: string[];
    userFollowers?: string[];
}

export interface ProfileResponse {
    id?: string;
    userId?: string;
    displayName?: string | null;
    photoURL?: string;
    bio?: string;
    userFollowing?: string[];
    userFollowers?: string[];
}

export interface CustomRouter {
    key?: string;
    path?: string;
    element?: React.ReactElement;
    children?: CustomRouter[];
    label?: string;
    isMenuItem?: boolean;
    icon?: React.ReactElement;
    render?: boolean;
    auth?: boolean;
    errorElement?: React.ReactElement;
    popUp?: boolean;
    imgAvantar?: boolean;
}