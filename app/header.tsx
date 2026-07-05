import { cookies } from "next/headers"
import HeaderClient from "./headerClient"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export default async function Header() {
    const cookieStore : ReadonlyRequestCookies = await cookies()
    const userId : string | undefined = cookieStore.get("user_id")?.value

    return (
        <HeaderClient userId={userId?.toString() ?? "Cant get one"} />
    )
}