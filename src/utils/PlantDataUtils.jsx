import { deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { plantsCollectionName, db, plantImageFolder, plantsCollectionRef, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const getAllPlant = async () => {
    try {
        const querySnapshot = await getDocs(plantsCollectionRef);

        const allPlants = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        
        if (querySnapshot.size > 0) {
            console.log(allPlants);
            return allPlants;
        } else {
            // Document doesn't exist
            console.log('No such document!');
            return false;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const getPlant = async (plantTag) => {
    try {
        const docRef = doc(db, plantsCollectionName, plantTag);
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
            console.log(docSnapshot.data());
            return docSnapshot.data();
        } else {
            // Document doesn't exist
            console.log('No such document!');
            return false;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const deletePlant = async (plantId) => {
    try {
        const docRef = doc(db, plantsCollectionName, plantId);
        await deleteDoc(docRef);
        console.log(plantId + " deleted");

    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const editPlant = async (newPlant) => {
    try {
        await setDoc(doc(db, plantsCollectionName, newPlant.tag), newPlant);
        console.log("success to add new plant")

    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const createPlant = async (newPlant) => {
    try {
        deletePlant(newPlant.tag).then(() => {
            editPlant(newPlant).then(() => {
                console.log("success to add new plant")
                return true;
            });
        });
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const isTagExist = async (plantTag) => {
    try {
        const q = query(plantsCollectionRef, where("tag", ">=", plantTag), where("tag", "<=", plantTag + '\uf8ff'))            
        const querySnapshot = await getDocs(q);

        return querySnapshot.size
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}

export const uploadPlantImage = async (fileName, file) => {
    try {
        const storageRef = ref(storage, plantImageFolder + fileName);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        
        return uploadTask;
    } catch (error) {
        console.error('Error upload image:', error);
    }
}

export const getPlantImageUrl = async (fileName) => {
    try{
        const storageRef = ref(storage, plantImageFolder + fileName);
        const downloadURL = await getDownloadURL(storageRef);
        
        console.log('Utils: File available at', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error get download url image:', error);
    }
}