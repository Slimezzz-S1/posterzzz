"use client"

import { useState } from "react"

export default function SearchPost() {
    const [isSearching, setIsSearching] = useState(false)
    const [searchUuid, setSearchUuid] = useState('')
    

    return (
        <>
            <button className="border p-2 col-start-2 row-start-1 cursor-pointer" onClick={() => setIsSearching(!isSearching)}>
                Search post
            </button>

            {isSearching && (
                <input
                    type="text"
                    placeholder="Search Post UUID"
                    className="border p-2 col-span-2"
                    value={searchUuid}
                    onChange={(e) => {setSearchUuid(e.target.value)}}
                />
            )}
        </>
    )
}