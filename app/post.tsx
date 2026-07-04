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
            <div className="flex flex-col border p-4 min-h-64">
                <h1 className="text-3xl">
                    {title}
                </h1>

                <p className="flex-1">
                    {content}
                </p>

                <div className="flex flex-col gap-0 items-e border-t pt-2">
                    <p>
                    Likes : {likes}
                    </p>

                    <p>
                    anon ID : {authorId}
                    </p>

                    <p>
                    post ID : {id}
                    </p>

                    <p>
                    Created at {createdAt.toLocaleDateString()}
                    </p>

                </div>
            </div>
        </Link>
    )
}