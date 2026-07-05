import prisma from "@/lib/db"
import { cookies } from "next/headers"
import Header from "./header"

import Posts from "./post"

import CreatePost from "./createPost"
import SearchPost from "./searchPost"

import Slime from "./slime"

export default async function Home({
  searchParams,
}: {
  searchParams : Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <>
      <section className="my-8 flex flex-col gap-8 px-4 lg:px-0">
        {params.lovesslime && (
          <Slime />
        )}
        <div className="grid grid-cols-2 gap-4">
          <CreatePost />
          <SearchPost />
        </div>

        <Posts />
        
      </section>
    </>
  )
}