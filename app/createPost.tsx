"use client"

import { useRef, useState } from "react"
import { createPost } from "./actions"

export default function CreatePost() {
    const formRef = useRef<HTMLFormElement>(null)
    const createRef = useRef<HTMLTextAreaElement>(null)
    const [isCreating, setIsCreating] = useState(false)

    function handleInput() {
        const el = createRef.current

        if (!el) {
            return
        }

        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

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
                    setIsCreating(false)
                }}
                className="border col-span-2 flex flex-col p-4 gap-4">
                    <input type="text" name="title" placeholder="Title" className="p-2 border" />

                    <textarea
                        ref={createRef}
                        name="content"
                        className="border p-2 resize-none"
                        placeholder="What do you want to say"
                        onInput={handleInput}
                    />

                    <button type="submit" className="border p-2 cursor-pointer">
                        Submit
                    </button>
                </form>
            )}
        </>
    )
}