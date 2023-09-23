import { signInWithPopup, signOut } from "firebase/auth"
import { auth, db, emailsCollectionName, googleProvider } from "../config/firebase"
import { decrypt, encrypt } from "./Crypto";
import AllowedEmail from "../config/AllowedEmail";
import { doc, getDoc } from "firebase/firestore";

export const isLogin = () => {
    return getCurrentUser() ? true : false;
}

export const getCurrentUser = () => {
    try {
        //get user from local storage, decrypt first then convert to Obj
        const user = localStorage.getItem("user");
        const userObj = JSON.parse(decrypt(user));
        return userObj;

    } catch (error) {
        console.log("Error parse user json", error);
        return false;
    }
}

// use harcode email
// export const isAllowedUser = (email) => {
//     return allowedEmail.includes(email.toLowerCase());
// }

export const isAllowedUser = async (email) => {
    try {
        const docRef = doc(db, emailsCollectionName, email);
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
            console.log('user document exist!');
            return true;
        } else {
            // Document doesn't exist
            console.log('No such user document!');
            return false;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        return false;
    }
}

export const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider);

        const user = auth.currentUser;
        
        //check allowed user
        const isAllowed = await isAllowedUser(user.email);
        if(!isAllowed){
            throw "not allowed user";
        }
        
        //save session to local storage
        const userJson = JSON.stringify({email: user.email, name: user.displayName, photoURL: user.photoURL});
        console.log(userJson);

        //encrypt the data for safety
        const encUser = encrypt(userJson);
        localStorage.setItem("user", encUser);

    }catch (err){
        console.log("Sign in with google error: ", err)
        throw err
    }
}

export const signOutAuth = async () => {
    try{
        await signOut(auth);
        localStorage.removeItem("user");
        window.location.reload();
    }catch (err){
        console.log("Sign out error: ", err)
    }
}