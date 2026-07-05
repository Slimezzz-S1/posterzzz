"use client"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
    const [isReveal, setIsReveal] = useState(false)

    return (
        <footer className="border-t p-4 flex justify-between">
            <p>
                &copy;2026 SlimeZZZ-S1
            </p>

            {isReveal ? (
                <p>
                    s11me_
                </p>
            ) : (
                <button onClick={() => {
                    setIsReveal(true)
                }}>
                    My Discord
                </button>
            )}
        </footer>
    )
}