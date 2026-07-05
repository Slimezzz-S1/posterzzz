"use server"

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"

const SLIMY = "cuteslime"

export async function Slime() {
    const cookieStore : ReadonlyRequestCookies = await cookies()

    cookieStore.set("user_id", SLIMY, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
    })

    return
}