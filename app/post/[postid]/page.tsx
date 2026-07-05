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
    }
  })
  const postReplies = await prisma.reply.findMany({
    where : {
      authorId : postid
    }
  })

  if (!post) {
    notFound()
  }

  return (
      <section className="my-8 flex flex-col gap-8 px-4 lg:px-0">
        <PostClient
          id={post.id}
          authorId={post.authorId}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          likes={post.likes}
          isMain={true}
          replies={postReplies}
        />
      </section>
  )
}