//what is layout file  :: as in folder -all subfolder,subfile are containerized in it
'use client'
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/router";
import React from "react";


const Layout =({children}:{children :React.ReactNode})=>{
    //whether we check any session present(no meant that user went to login/register page its redirect to homepage ) or not 
    const {session} =useAuthStore();
    const router =useRouter(); //redirecting user here and their
    React.useEffect(()=>{
        if(session){
            router.push('/')
        }
    },[session,router])
    if(session)return null;
    
    return(
        <div className="">
            <div className="">{children}</div>
        </div>
    )
    
}

export default Layout