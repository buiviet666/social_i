import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { DocumentResponse, Post, ProfileInfo } from "../pages/Types";
import { db } from "../firebaseConfig";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const tempArr: DocumentResponse[] = [];
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Post;
                const responseObj: DocumentResponse = {
                    id: doc.id,
                    ...data,
                };
                tempArr.push(responseObj);
            });

            return tempArr;
        } else {
            console.log("no document");
        }
    } catch (error) {
        console.log(error);
    }
};


export const getPostByUserId = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
    return getDocs(q);
};

export const getPostLikes = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userlikes", "array-contains", id));
    return getDocs(q);
}

export const getPostSave = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("usersave", "array-contains", id));
    return getDocs(q);
}

export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return getDoc(docRef);
};

export const updatePost = async (id: string, post: DocumentResponse) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        ...post,
    });
};

export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const uploadLikesOnPost = (
    id: string,
    userlikes: string[],
    likes: number,
) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        likes: likes,
        userlikes: userlikes,
    });
};

export const uploadSaveOnPost = (
    id: string,
    usersave: string[],
) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        usersave: usersave,
    })
}

export const updateUserInfoOnPosts = async (profileInfo: ProfileInfo) => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", profileInfo.user?.uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        querySnapshot.forEach((document) => {
            const docRef = doc(db, COLLECTION_NAME, document.id);
            updateDoc(docRef, {
                username: profileInfo.displayName,
                photoURL: profileInfo.photoURl,
            });
        });
    } else {
        console.log("The user doesn't have any post");
    }
};