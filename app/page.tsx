import prisma from "@/lib/db";

import Header from "./header";
import { cookies } from "next/headers";
import MockPosts from "./faker";
import Post from "./post";

export default async function Home() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value
  const posts = await prisma.post.findMany()

  return (
    <div className="flex flex-col min-h-screen max-w-xl w-screen mx-auto">
      <Header userId={userId ?? "can't get one"} /> 

      <section className="my-8 flex flex-col gap-8">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            authorId={post.authorId}
            title={post.title}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
          />
        ))}
        <MockPosts />
      </section>
    </div>
  )
}