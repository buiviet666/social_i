import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

type Props = {}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    sigIn: typeof sigIn;
    logOut: typeof logOut;
};

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const sigIn = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
    signOut(auth);
}

export const UserAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    sigIn,
    logOut,
});

export const UserAuthProvider = (children: React.ReactNode) => {

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
        sigIn,
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