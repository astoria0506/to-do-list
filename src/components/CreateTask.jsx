"use client";

import { refreshHelper } from "@/helpers/refreshHelper";

export default function CreateTask() {

    async function submit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:3000/api/task", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        })
        refreshHelper.fire()
    }

    return(
        <form onSubmit={submit} className="p-8 border-4 rounded-md flex gap-4">
            <input type="text" placeholder="wpisz zadanie" className="rounded-md p-2 border-2 w-full" name="title" required/>
            <button className="border-2 w-24 p-2 h-14 bg-red-400 rounded-md">DODAJ</button>
        </form>
    )
}