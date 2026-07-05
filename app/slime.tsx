"use client"

import React, { useRef, useState } from "react"
import { confirmLogin,  login } from "./actions"
import { log } from "console"
import { useRouter } from "next/navigation"

export default function Slime() {
    const [isOpened, setIsOpened] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleConfirm : (password : string) => void = async (password : string) => {
        const isTrue = await confirmLogin(password)

        if (isTrue) {
            setConfirm(true)
        } else {
            console.log("no")
            
            return 
        }
    }

    const handleLogin = async (wantsRevert : boolean) => {
        login(passwordRef?.current?.value ?? "", wantsRevert)

        router.refresh()

        setIsOpened(false)
        setConfirm(false)
    }

    return (
        <>
            <button
                className="border p-2"
                onClick={() => setIsOpened(!isOpened)}
                children="Be Admin"
            />

            {isOpened && (
                <div
                    className="flex flex-col gap@-[inherit] border p-4"
                >
                    {!confirm && (
                        <>
                            <label htmlFor="password-input" className="text-2xl text-center">
                                What's the password then?
                            </label>

                            <input
                                ref={passwordRef}
                                id="password-input"
                                className="border p-2 w-full"
                                type="text"
                                name="password"
                                placeholder="password"
                            />

                            <button className="border p-2 w-full" onClick={(e : React.MouseEvent) => {
                                handleConfirm(passwordRef.current?.value ?? "")
                            }}>
                                Submit
                            </button>
                        </>
                    )}

                    {confirm && (
                        <>
                            <button className="border p-2" onClick={() => handleLogin(false)}>
                                Change to admin ID
                            </button>

                            <button className="border p-2" onClick={() => handleLogin(true)}>
                                Revert name
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}