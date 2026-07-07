import prisma from "@/lib/db";
import PostClient, { postProps } from "./postClient";
import { Prisma } from "./generated/prisma/client";

interface postServerProps extends postProps {
    _count? : number
}

interface postsProps {
    fromUserId? : string
    sortDate? : "desc" | "asc",
}

export default async function Posts({ fromUserId, sortDate } : postsProps) {
    if (!fromUserId) {
        const specialPosts = await prisma.post.findMany({
            where : {
                isUnique : true,
                authorId : "0"
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
                isUnique : false,
            },
            include : {
                _count : {
                    select : {
                        replies : true
                    }
                }
            },
            orderBy : {
                createdAt : sortDate ?? "desc"
            }
        })

        const posts = [
            ...specialPosts,
            ...regularPosts
        ]
    }

    const specialPosts = await prisma.post.findMany({
        where : {
            isUnique : true,
            authorId : fromUserId
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
            isUnique : false,
            authorId : fromUserId
        },
        include : {
            _count : {
                select : {
                    replies : true
                }
            }
        },
        orderBy : {
            createdAt : sortDate ?? "desc"
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