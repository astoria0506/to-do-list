"use client";

import navigate from "@/helpers/navigate";
import { useEffect } from "react";

export default function RedirectToLogin() {

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem("token")
    
            if(!token || token == "") {
                navigate("/login")
            }
        }

    }, [])

    return(<></>)
}