"use client"

import { useState } from "react"

interface headerProps {
    userId : string
}

export default function Header({userId} : headerProps) {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="sticky top-0 left-0">
            <header className="flex justify-between items-center border-b bg-background p-4 min-h-22">
                <h1 className="text-4xl">
                    PosterZZZ
                </h1>

                <p onClick={() => setIsOpened(!isOpened)} className="text-right">
                    {isOpened ? userId : "Show your anon id?"}
                </p>
            </header>
        </div>
    )
}