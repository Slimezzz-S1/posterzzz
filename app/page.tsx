import prisma from "@/lib/db";
import { cookies } from "next/headers";
import Header from "./header";

import Post from "./post";

import CreatePost from "./createPost";
import SearchPost from "./searchPost";
import MockPosts from "./faker";


export default async function Home() {
  const cookieStore = await cookies()
  const posts = await prisma.post.findMany()

  return (
    <div className="flex flex-col min-h-screen max-w-5xl w-screen mx-auto">
      <Header />

      <section className="my-8 flex flex-col gap-8 px-4 lg:px-0">
        <div className="grid grid-cols-2 gap-4">
          <CreatePost />
          <SearchPost />
        </div>

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