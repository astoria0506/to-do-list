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

    async function changeTitle(event) {
        const token = localStorage.getItem("token")
        const id = event.target.getAttribute("data-id")
        await fetch("http://localhost:3000/api/task?update=" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                title: event.target.value,
                status: tasks.find(task => task.id == id).status
            })
        })
    } 

    async function changeStatus(event) {
        const token = localStorage.getItem("token")
        const id = event.target.getAttribute("data-id")
        await fetch("http://localhost:3000/api/task?update=" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                title: tasks.find(task => task.id == id).title,
                status: event.target.value
            })
        })
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
                        <input onChange={changeTitle} type="text" defaultValue={task.title} name="title" className="text-lg mb-1" data-id={task.id}/>
                        <select name="status" data-id={task.id} defaultValue={task.status} onChange={changeStatus}>
                            <option value="do zrobienia">do zrobienia</option>
                            <option value="w trakcie">w trakcie</option>
                            <option value="zakończone">zakończone</option>
                        </select>
                        <div className="flex justify-end text-sm cursor-pointer">
                            <div onClick={() => deleteTask(task.id)}>usuń</div>
                        </div>
                    </div>
                )
            })]}
        </div>
    )
}