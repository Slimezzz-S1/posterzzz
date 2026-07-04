import Link from "next/link"

export interface postProps {
    id : string
    authorId : string
    title : string
    content : string
    likes : number
    createdAt : Date
}

export default function Post({id, authorId, title, content, likes, createdAt} : postProps) {
    return (
        <Link key={id} href={`/post/${id}`}>
            <div className="flex flex-col border p-4 min-h-75">
                <h1 className="text-3xl">
                    {title}
                </h1>

                <p className="flex-1 whitespace-pre-wrap border-y my-4 py-4">
                    {content.replace(/\\n/g, "\n")}
                </p>

                <div className="flex flex-col gap-0 items-e pt-2">
                    <p>
                        Post ID : {id}
                    </p>

                    <p>
                        Anon ID : {authorId}
                    </p>

                    <p>
                        Created at {createdAt.toLocaleDateString()}
                    </p>

                    <p>
                        Likes : {likes}
                    </p>
                </div>
            </div>
        </Link>
    )
}