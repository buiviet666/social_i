import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import { ProfileInfo } from '../pages/Types';

interface UserAuthContext {
    children: React.ReactNode;
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signIn: typeof signIn;
    logOut: typeof logOut;
    updateProfileInfo: typeof updateProfileInfo;
};

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signIn = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
    signOut(auth);
}

const updateProfileInfo = (profileInfo: ProfileInfo) => {
    console.log("The user profileInfo is : ", profileInfo);
    return updateProfile(profileInfo.user!, {
        displayName: profileInfo.displayName,
        photoURL: profileInfo.photoURl,
        bio: profileInfo.userBio,
    });
};

export const UserAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signIn,
    logOut,
    updateProfileInfo,
});




export const UserAuthProvider: React.FunctionComponent<UserAuthContext> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("I am in useEffect and user is : ", user);
            if (user) {
                console.log("The logged in user state is : ", user);
                setUser(user);
            }

            return () => {
                unsubscribe();
            };
        });
    });

    const value: AuthContextData = {
        user,
        logIn,
        signIn,
        logOut,
        updateProfileInfo,
    }

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
}