//use hardcode
// const tempEmail = import.meta.env.VITE_ALLOWED_EMAIL
// export const allowedEmail = tempEmail.split(',');

import { getAllowedEmail } from "../utils/Email";

async function AllowedEmail() {
    const tempAllowedEmail = await getAllowedEmail();
    if(tempAllowedEmail){
        return tempAllowedEmail.map((item) => item.email);
    }else{
        return [];
    }
}

export default AllowedEmail;