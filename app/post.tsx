import prisma from "@/lib/db";
import PostClient, { postProps } from "./postClient";
import { Prisma } from "./generated/prisma/client";

interface postServerProps extends postProps {
    _count? : number
}

export default async function Posts() {
    const specialPosts = await prisma.post.findMany({
        where : {
            isUnique : true
        },
        include : {
            _count : {
                select : {
                    replies : true
                }
            }
        }
    })

    const regularPosts = await prisma.post.findMany({
        where : {
            isUnique : false
        },
        include : {
            _count : {
                select : {
                    replies : true
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    })

    const posts = [

        ...specialPosts,
        ...regularPosts
    ]

    return posts.map((post) => (
        <PostClient
            key={post.id}
            id={post.id}
            authorId={post.authorId}
            title={post.title}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            repliesAmount={post._count.replies}
        />
    ))
}