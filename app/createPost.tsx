"use client"

import { useState } from "react"

export default function CreatePost() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <>
            <button className="border p-2" onClick={() => setIsCreating(!isCreating)}>
                Create post
            </button>

            {isCreating && (
                <form action="" className="border col-span-2 flex flex-col p-4 gap-4">
                    <input type="text" name="title" placeholder="Title" className="p-2 border" />
                    {
                    //    <input type="text" name="content" placeholder="What do you want to say?" className="p-2 border" />
                    }

                    <textarea name="content" className="border p-2" placeholder="What do you want to say" />

                    <button type="submit" className="border p-2">
                        Submit
                    </button>
                </form>
            )}
        </>
    )
}