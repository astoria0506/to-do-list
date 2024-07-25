"use client";

import navigate from "@/helpers/navigate";
import { useState } from "react"

export default function LoginForm() {
    const [error, setError] = useState("")
    async function submit(event) {
        event.preventDefault()
        setError("")
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if(res.status != 200) {
            setError("dane logowania są niepoprawne")
            return;
        }

        const json = await res.json()
        localStorage.setItem("token", json.token)
        navigate("/")
    } 

    return(
        <form className="border-2 bg-orange-300 rounded-xl p-8" onSubmit={submit}>
            <div className="text-center font-bold">LOG IN</div>
            <input className="w-full mb-8 mt-4 rounded-md p-2" type="text" placeholder="E-mail" name="email" /> <br />
            <input className="rounded-md p-2" type="password" placeholder="Password" name="password"/> <br />
            <p className="text-red-600 mb-8">
                {error}
            </p>
            <button className="border-2 w-16 h-8 mt-4 bg-red-400 rounded-md">Log in</button>
        </form>
    )
}