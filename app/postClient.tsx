"use client"

import { useRouter } from "next/navigation"
import { createReply, likePost, likeReply } from "./actions"
import { useRef, useState } from "react"

export interface replyProps {
    id : string
    authorId : string
    content : string
    likes : number
    createdAt : Date
}
export interface postProps {
    id : string
    authorId : string
    title : string
    content : string
    likes : number
    createdAt : Date
    replies? : replyProps[]
    repliesAmount? : number
}

export function Reply({id, authorId, content, likes, createdAt} : replyProps) {
    const likeHandle = () => {
        likeReply(id)
    }

    return (
        <div className="border p-2">
            <p className="text-2xl border-b py-2 mb-2 whitespace-pre-wrap">
                {content}
            </p>

            <div className="flex justify-between">
                <div>
                    <p>
                        Reply ID : {id}
                    </p>

                    <p>
                        Anon ID : {authorId}
                    </p>

                    <p>
                        Created At : {createdAt.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <p>
                        Likes : {likes}
                    </p>
                </div>

                <div className="flex flex-col justify-end gap-2">
                    <button className="border p-2 min-w-32" onClick={likeHandle}>
                        Like
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function PostClient({id, authorId, title, content, likes, createdAt, repliesAmount, replies, isMain = false} : postProps & {isMain? : boolean}) {
    const [isReplying, setIsReplying] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const replyInputRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()

    function handleInput() {
        const el = replyInputRef.current

        if (!el) {
            return
        }

        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    const linkHandle : (e : React.MouseEvent) => void = (e : React.MouseEvent) => {
        if (isMain) {
            return
        }

        const selection : Selection | null = window.getSelection()

        if (selection && selection.toString().length > 0) {
            e.preventDefault()
            return
        }

        router.push(`/post/${id}`)
    }

    const likeHandle : (e : React.MouseEvent) => void = (e : React.MouseEvent) => {
        e.stopPropagation()

        likePost(id)
    }

    const replyHandle : (e : React.MouseEvent) => void = (e : React.MouseEvent) => {
        e.stopPropagation()

        setIsReplying(!isReplying)
    }

    return (
        <>
            <div className="flex flex-col border p-4 min-h-75" onClick={linkHandle}>
                <h1 className={isMain ? "text-5xl" : "text-3xl"}>
                    {title}
                </h1>

                <p className="flex-1 whitespace-pre-wrap border-y my-4 py-4">
                    {content}
                </p>

                <div className="flex justify-between">
                    <div>
                        <p>
                            Post ID : {id}
                        </p>

                        <p>
                            Anon ID : {authorId}
                        </p>

                        <p>
                            Created at {createdAt.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <p>
                            Likes : {likes}
                        </p>

                        <p>
                            Replies : {repliesAmount ?? 0}
                        </p>
                    </div>

                    <div className="flex flex-col justify-end gap-2">
                        <button className="border p-2 min-w-32" onClick={likeHandle}>
                            Like
                        </button>
                    </div>
                </div>
            </div>

            {isMain && (
                <div className="border p-4">
                    <h1 className=" text-5xl border-b pb-4 mb-4">
                        Replies
                    </h1>

                    <div className="flex flex-col gap-4">
                        <button className="border p-2 min-w-32 self-start" onClick={replyHandle}>
                            Create Reply
                        </button>

                        {isReplying && (
                            <form
                                ref={formRef}
                                action={async (formData) => {
                                    await createReply(formData, id)

                                    formRef.current?.reset()
                                    setIsReplying(false)
                                }}
                                className="border p-4 flex flex-col gap-4"
                            >
                                <textarea
                                    ref={replyInputRef}
                                    name="content"
                                    className="border p-2 field-sizing-content resize-none"
                                    placeholder="Type something"
                                    onInput={handleInput}
                                />

                                <button type="submit" className="border p-2">
                                    Submit
                                </button>
                            </form>
                        )}

                        {replies ? replies?.map(reply => (
                            <Reply
                                key={reply.id}
                                id={reply.id}
                                authorId={reply.authorId}
                                content={reply.content}
                                likes={reply.likes}
                                createdAt={reply.createdAt}
                            />
                        )) : (
                            <p>
                                No replies :(
                            </p>
                        )
                        }
                    </div>
                </div>
            )}
        </>
    )
}