"use server";

import { redirect } from "next/navigation";

export default async function navigate(url) {
    redirect(url)
} 