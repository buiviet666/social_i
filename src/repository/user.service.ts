import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ProfileResponse, userProfile } from "../pages/Types";
import { db } from "../firebaseConfig";
import { UserProfile } from "firebase/auth";

const COLLECTION_NAME = "user";

export const createUserProfile = (user: userProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user);
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const querySnapshot = await getDocs(q);
        const tempArr: ProfileResponse[] = [];
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as userProfile;
                const responseObj: ProfileResponse = {
                    id: doc.id,
                    ...data,
                };
                tempArr.push(responseObj);
            });
            return tempArr;
        } else {
            console.log("no doc");
        }
    } catch (err) {
        console.log(err);
    }
}

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

export const updateFollowProfile = (
    id: string,
    userFollowers: string[],
) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        userFollowers: userFollowers,
    })
}

export const updateFollowingProfile = (
    id: string,
    userFollowing: string[],
) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        userFollowing: userFollowing,
    })
}

export const getUserRecommend = async (userId: string) => {
    try {
        const queryToDb = await getDocs(collection(db, COLLECTION_NAME));
        const tempArr: ProfileResponse[] = [];
        if (queryToDb.size > 0) {
            queryToDb.forEach((each) => {
                const userData = each.data() as UserProfile;
                const responseObj: ProfileResponse = {
                    id: each.id,
                    ...userData,
                };
                tempArr.push(responseObj);
            });

            const getDatas = tempArr.filter((item) => item.userId !== userId);
            const getDataNoFollow = getDatas.filter((val) => !val.userFollowers?.includes(userId));

            const seen = new Set();
            const uniqueDatas = getDataNoFollow.filter((items) => {
                if (seen.has(items.userId)) {
                    return false;
                } else {
                    seen.add(items.userId);
                    return true;
                }
            })
            return uniqueDatas.slice(0, 5);
        } else {
            console.log("Nothing to get");
        }
    } catch (err) {
        console.log(err);
    }
}