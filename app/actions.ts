"use server"

import prisma from "@/lib/db"
import { tr } from "@faker-js/faker"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { PassThrough } from "stream"

const ADMIN_PASSWORD = "iReallyReallyLoveSlime"

export async function confirmLogin(password : string) {
    return password == ADMIN_PASSWORD
}

export async function login(password : string, wantsRevert : boolean) {
    const cookieStore = await cookies()
    const currentUserId : string | "" = cookieStore.get("user_id")?.value ?? ""
    const oldUserId : string | "" = cookieStore.get("old_user_id")?.value ?? ""

    if (!confirmLogin(password)) {
        return false
    }
    
    if (wantsRevert) {
        if (!oldUserId) {
            console.log(`this dude (${currentUserId}) has no old user id lol`)

            return false
        }

        cookieStore.set("user_id", oldUserId, {
            httpOnly : true,
            sameSite : "lax",
            maxAge : 60 * 60 * 24 * 365
        })

        revalidatePath("/")

        return true
    }

    cookieStore.set("old_user_id", currentUserId, {
        httpOnly : true,
        sameSite : "lax",
        maxAge : 60 * 60 * 24 * 365
    })

    cookieStore.set("user_id", "0", {
        httpOnly : true,
        sameSite : "lax",
        maxAge : 60 * 60 * 24 * 365
    })

    revalidatePath("/")

    return true
}

// export async function login(formData : FormData, wantsRevert : boolean) {
// //    const userId : string = formData.get("id") as string
//     const password : string = formData.get("password") as string
//     const cookieStore = await cookies()
//     const oldUserId = cookieStore.get("user_id")?.value

//     if (password != "") {
//         return false
//     }

//     if (wantsRevert) {
//         if (oldUserId) {
//             cookieStore.set("user_id", oldUserId, {
//                 httpOnly : true,
//                 sameSite : "lax",
//                 maxAge : 60 * 60 * 24 * 365
//             })

//             revalidatePath("/")

//             return true
//         } else {
//             console.log("this dude has no user id lol")
//         }

//         return false
//     }

//     if (oldUserId) {
//         cookieStore.set("old_user_id", oldUserId, {
//             httpOnly: true,
//             sameSite: "lax",
//             maxAge: 60 * 60 * 24 * 365,
//         })
//     }

//     cookieStore.set("user_id", "0", {
//         httpOnly : true,
//         sameSite : "lax",
//         maxAge : 60 * 60 * 24 * 365
//     })

//     revalidatePath("/")

//     return true
// }

export async function createUser(userId : string) {
    const existingUserId = await prisma.user.findUnique({
        where : {
            id : userId
        }
    })

    if (!existingUserId) {
        prisma.user.create({
            data : {
                id : userId
            }
        })
    }

    return
}

export async function createPost(formData : FormData) {
    const title : string = formData.get("title") as string
    const content : string = formData.get("content") as string
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value ?? "Who dis"

    createUser(userId)
    
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

export async function createReply(formData : FormData, postId : string) {
    const content : string = formData.get("content") as string
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value ?? "Who dis"

    createUser(userId)

    if (!content) {
        return
    }

    const result = await prisma.reply.create({
        data : {
            content : content,
            postId : postId,
            authorId : userId
        }
    })

    revalidatePath("/")
}

export async function likePost(postId : string) {
    await prisma.post.update({
        where : {
            id : postId
        },
        data : {
            likes : {
                increment : 1 
            }
        }
    })

    revalidatePath("/")
}

export async function likeReply(replyId : string) {
    await prisma.reply.update({
        where : {
            id : replyId
        },
        data : {
            likes : {
                increment : 1
            }
        }
    })

    revalidatePath("/")
}