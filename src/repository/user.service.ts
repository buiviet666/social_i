import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ProfileResponse, userProfile } from "../pages/Types";
import { db } from "../firebaseConfig";

const COLLECTION_NAME = "user";

export const createUserProfile = (user: userProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user);
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async (userId: string) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("userId", "==", userId),
        );

        const querySnapshot = await getDocs(q);
        let tempData: ProfileResponse = {};
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as userProfile;
                tempData = {
                    id: doc.id,
                    ...userData,
                }
            });
            return tempData;
        } else {
            console.log("no doc");
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateUserProfile = async (id: string, user: userProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        ...user,
    });
};