import prisma from "@/lib/db"
import { notFound } from "next/navigation"

import PostClient from "@/app/postClient"

export default async function PostPage({
  params
} : {
  params: Promise<{ postid: string }>
}) {
  const { postid } = await params

  const post = await prisma.post.findUnique({
    where : {
      id : postid
    },
    include : {
      _count : {
        select : {
          replies : true
        }
      }
    }
  })

  const postReplies = await prisma.reply.findMany({
    where : {
      postId : postid
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  if (!post) {
    notFound()
  }

  return (
      <>
        <PostClient
          id={post.id}
          authorId={post.authorId}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          likes={post.likes}
          isMain={true}
          replies={postReplies}
          repliesAmount={post._count.replies}
        />
      </>
  )
}