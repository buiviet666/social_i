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
}

export interface ProfileInfo {
    user?: User;
    displayName?: string;
    photoURl?: string;
    userBio?: string;
}

export interface userProfile {
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
}

export interface ProfileResponse {
    id?: string;
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
}