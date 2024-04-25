import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { DocumentResponse, Post } from "../pages/Types";
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

export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return getDoc(docRef);
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