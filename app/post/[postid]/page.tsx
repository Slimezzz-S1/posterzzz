// import { prisma } from "../lib/prisma";
import Header from "@/app/header"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

export default async function PostPage({
params}: {
  params: Promise<{ postid: string }>;
}) {
  const { postid } = await params

  const post = await prisma.post.findUnique({
    where: { id: postid },
  })

  if (!post) {
    notFound()
  }

  return (
    <>
        <Header />

        <section className="my-8 flex flex-col gap-8 px-4 lg:px-0">
          <div className="border p-4">

            <h1 className="text-6xl">
              {post.title}
            </h1>

            <p className="min-h-26 py-4 border-y my-4 whitespace-pre-wrap">
              {post.content.replace(/\\n/g, "\n")}
            </p>

            <div>
              <p>
                Post ID : {post.id}
              </p>

              <p>
                Anon ID : {post.authorId}
              </p>

              <p>
                Created At : {post.createdAt.toLocaleDateString()}
              </p>

              <p>
                Likes {post.likes}
              </p>
            </div>
          </div>

        </section>
    </>
  );
}