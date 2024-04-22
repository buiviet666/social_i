import { OutputFileEntry } from "@uploadcare/blocks";

export interface UserLogIn {
    email: string;
    password: string;
}

export interface UserSignIn {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FileEntry {
    files: OutputFileEntry[];
}

export interface Post {
    date: Date;
    likes: number;
    photos: PhotoMeta[];
    userId: string | null;
    caption: string;
}

export interface PhotoMeta {
    cdnUrl: string;
    uuid: string;
}