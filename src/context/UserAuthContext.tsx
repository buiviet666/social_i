import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

interface UserAuthContext {
    children: React.ReactNode;
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signIn: typeof signIn;
    logOut: typeof logOut;
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

export const UserAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signIn,
    logOut,
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