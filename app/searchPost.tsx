"use client"

import { useState } from "react"

export default function SearchPost() {
    const [isSearching, setIsSearching] = useState(false)

    return (
        <>
            <button className="border p-2 col-start-2 row-start-1" onClick={() => setIsSearching(!isSearching)}>
                Search post
            </button>

            {isSearching && (
                <input type="text" placeholder="Search Post UUID" className="border p-2 col-span-2" />
            )}
        </>
    )
}