import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"
import { decrypt, encrypt } from "./Crypto";
import { allowedEmail } from "../config/AllowedEmail";

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

export const isAllowedUser = (email) => {
    return allowedEmail.includes(email);
}

export const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider);

        const user = auth.currentUser;
        
        //check allowed user
        if(!isAllowedUser(user.email)){
            throw "not allowed user";
        }
        
        //save session to local storage
        const userJson = JSON.stringify({email: user.email, name: user.displayName});
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