"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchPost() {
    const [isSearching, setIsSearching] = useState(false)
    const [searchUuid, setSearchUuid] = useState('')
    const router = useRouter()

    function handleSearch() {
        router.push(`/post/${searchUuid}`);
    }
    
    return (
        <>
            <button className="border p-2 col-start-2 row-start-1 cursor-pointer" onClick={() => setIsSearching(!isSearching)}>
                Search post
            </button>

            {isSearching && (
                <>
                <input
                    type="text"
                    placeholder="Search Post UUID"
                    className="border p-2 col-span-3"
                    value={searchUuid}
                    onChange={(e) => {setSearchUuid(e.target.value)}}
                />

                <button className="p-2 border col-span-3" onClick={handleSearch}> Search </button>
                </>
            )}
        </>
    )
}