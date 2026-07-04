"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createPost(formData : FormData) {
    const title : string = formData.get("title") as string
    const content : string = formData.get("content") as string
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value
    
    if (!title || !content) {
        return
    }

    await prisma.post.create({
        data : {
            title : title,
            content : content,
            authorId : userId
        }
    })

    revalidatePath("/")
}