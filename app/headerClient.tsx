"use client"

import { use, useState } from "react"

export default function HeaderClient({userId} : {userId : string}) {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="sticky top-0 left-0">
            <header className="flex justify-between items-center border-b bg-background p-4 min-h-22">
                <a className="text-4xl" href="/">
                    PosterZZZ
                </a>

                {isOpened ? <p> {userId} </p> : <button onClick={() => setIsOpened(true)}> Open your anon id? </button>}
            </header>
        </div>
    )
}