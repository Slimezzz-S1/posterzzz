"use client"

import { useRouter } from "next/navigation"
import { isSea } from "node:sea"
import { useRef, useState } from "react"

export default function SearchUser() {
    const [isSearching, setIsSearching] = useState(false)
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

    const formHandle : (formData : FormData) => void = (formData : FormData) => {
        router.push(`/user/${formData.get("user-id")}`)
    }
    
    return (
        <>
            <button className="border p-2 col-start-3 row-start-1" onClick={() => setIsSearching(!isSearching)}>
                Search anon
            </button>

            {isSearching && (
                <form action={formHandle} className="col-span-3 flex flex-col gap-[inherit]">
                    <input type="text" name="user-id" placeholder="enter anon UUID" className="border p-2" />

                    <button type="submit" className="border p-2">
                        Search
                    </button>
                </form>
            )}
        </>
    )
}