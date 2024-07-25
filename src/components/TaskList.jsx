"use client";

import { refreshHelper } from "@/helpers/refreshHelper";
import { useEffect } from "react";
import { useState } from "react"

export default function TaskList() {
    const [tasks, setTasks] = useState([])

    async function getTasks() {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3000/api/task", {
            headers: {
                "Authorization": "Bearer " + token
            },
        })
        const json = await res.json()
        setTasks(json)
    }

    async function deleteTask(id) {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3000/api/task?delete=" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            },
        })
        getTasks()
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            getTasks()    
        }
    }, [])

    refreshHelper.subscribe(() => getTasks())

    return(
        <div className="flex flex-col gap-8 mt-8">
            {[...tasks.map((task, i) => {
                return (
                    <div className="p-8 border-4 rounded-md" key={i}>
                        <div className="text-lg mb-1">{task.title}</div>
                        <div>{task.status}</div>
                        <div className="flex justify-end text-sm cursor-pointer">
                            <div onClick={() => deleteTask(task.id)}>usuń</div>
                        </div>
                    </div>
                )
            })]}
        </div>
    )
}