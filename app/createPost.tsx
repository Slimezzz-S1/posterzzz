"use client"

import { useRef, useState } from "react"
import { createPost } from "./actions"

export default function CreatePost() {
    const formRef = useRef<HTMLFormElement>(null)
    const [isCreating, setIsCreating] = useState(false)

    return (
        <>
            <button className="border p-2 cursor-pointer" onClick={() => setIsCreating(!isCreating)}>
                Create post
            </button>

            {isCreating && (
                <form
                ref={formRef}
                action={async (formData) => {
                    await createPost(formData)
                    formRef.current?.reset()
                }}
                className="border col-span-2 flex flex-col p-4 gap-4">
                    <input type="text" name="title" placeholder="Title" className="p-2 border" />
                    {
                    //    <input type="text" name="content" placeholder="What do you want to say?" className="p-2 border" />
                    }

                    <textarea name="content" className="border p-2" placeholder="What do you want to say" />

                    <button type="submit" className="border p-2 cursor-pointer">
                        Submit
                    </button>
                </form>
            )}
        </>
    )
}