"use client";

import { useState } from "react";

export default function RegisterForm() {
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPass,setErrorPass] = useState("")
    const [success, setSuccess] = useState("") 
    async function submit(event) {
        event.preventDefault()
        
        setErrorEmail("")
        setErrorPass("")
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        
        if(!data.email || data.email == "") {
            setErrorEmail("wprowadź e-mail")
        }
        if(!data.password || data.password == "" || !data.password2 || data.password2 == "") {
            setErrorPass("wprowadź hasło")
        }
        if(data.password != data.password2) {
            setErrorPass("hasła są różne")
        }

        if(errorEmail != "" && errorPass !="")
            return;

        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if(res.status != 200) {
            setErrorEmail("e-mail jest zajęty")
            return;
        }

        setSuccess("pomyślnie zarejestrowano")

    } 
    return(
        <form className="bg-emerald-400 border-2 rounded-xl p-8" onSubmit={submit}>
            <div className="font-bold text-center">SING IN</div>
            <input  disabled={success != ""} className="rounded-md p-2 mt-4" type="email" placeholder="e-mail" name="email"/> <br />
            <p className="text-red-600 mb-8">
                {errorEmail}
            </p>
            <input className="rounded-md mb-4 p-2" type="password" placeholder="password" name="password"  disabled={success != ""}/> <br />  
            <input className="rounded-md p-2" type="password" placeholder="repeat password" name="password2" disabled={success != ""}/> <br />  
            <p className="text-red-600 mb-8">
                {errorPass}
            </p>
            <button type="submit" className="border-2 mt-4 bg-red-400 rounded-md p-1" disabled={success != ""}>Sing in</button>
            <p className="text-black">
                {success}
            </p>
        </form>
    )
}