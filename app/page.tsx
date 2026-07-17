import Posts from "./post"
import CreatePost from "./createPost"
import SearchPost from "./searchPost"
import SearchUser from "./searchuser"

import Slime from "./slime"

export default async function Home({
  searchParams,
}: {
  searchParams : Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <>
      {params.lovesslime == "true" && (
        <Slime />
      )}
      <div className="grid grid-cols-3 gap-4">
        <CreatePost />
        <SearchPost />
        <SearchUser />
      </div>

      <Posts />
    </>
  )
}