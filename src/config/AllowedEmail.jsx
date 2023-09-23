//use hardcode
// const tempEmail = import.meta.env.VITE_ALLOWED_EMAIL
// export const allowedEmail = tempEmail.split(',');

import { getAllowedEmail } from "../utils/Email";

const setAllowedEmail = async () => {
    const tempAllowedEmail = await getAllowedEmail();
    if(tempAllowedEmail){
        return tempAllowedEmail.map((item) => item.email);
    }else{
        return [];
    }
}

export const allowedEmail = await setAllowedEmail();