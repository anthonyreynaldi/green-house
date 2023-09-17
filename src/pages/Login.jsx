import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { getCurrentUser, isLogin, signInWithGoogle } from "../utils/Auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login(){
    const [login, setLogin] = useState(false);
    const [loginMsg, setLoginMsg] = useState(null);

    const signIn = async () => {
        try {
            await signInWithGoogle();
            console.log("sign in done");

            if(isLogin()){
                console.log("redirect");
                window.location.reload();
                return <Navigate to="/admin" />
            }
            
            console.log("false");
        } catch (error) {
            setLoginMsg("Login gagal. Silahkan coba lagi")
            console.log("Failed To Sign in");
        }
    }

    if(isLogin()){
        return <Navigate to="/admin" />
    }


    return (
        <>
            <div className="grid place-items-center">

                <Card className="w-96 mt-10">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                        Sign In
                        </Typography>
                    </CardHeader>

                    <CardBody className="flex flex-col gap-4">
                        {"Login Method"}
                    </CardBody>

                    <CardFooter className="pt-0">
                        <Button variant="outlined" fullWidth onClick={signIn}>
                            <div className="flex place-items-center justify-center gap-3">

                                <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/logos/logo-google.png" alt="google" className="h-6 w-6" />
                                Sign In with Google
                            </div>
                        </Button>
                        
                        {
                            loginMsg ? 
                            (
                                <Typography color="red" variant="small" className="mt-6 flex justify-center text-center">
                                    {loginMsg}
                                </Typography>
                            )
                            :
                            ""
                        }
                        <Typography variant="small" className="mt-6 flex justify-center text-center">
                            Silahkan hubungi Admin untuk mendapatkan akses
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}