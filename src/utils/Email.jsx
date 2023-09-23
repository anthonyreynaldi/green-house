import { deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db, emailsCollectionName, emailsCollectionRef } from "../config/firebase";

export const getAllowedEmail = async () => {
    try {
        const querySnapshot = await getDocs(emailsCollectionRef);

        const allowedEmail = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        
        if (querySnapshot.size > 0) {
            console.log(allowedEmail);
            return allowedEmail;
        } else {
            // Document doesn't exist
            console.log('No such document!');
            return false;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const deleteEmail = async (email) => {
    try {
        const docRef = doc(db, emailsCollectionName, email);
        await deleteDoc(docRef);
        console.log(email + " deleted");

    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const addEmail = async (newEmail) => {
    try {
        await setDoc(doc(db, emailsCollectionName, newEmail.email), newEmail);
        console.log("success to add new email")

    } catch (error) {
        console.error('Error fetching document:', error);
    }
}