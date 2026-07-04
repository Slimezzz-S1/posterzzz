import { cookies } from "next/headers"
import HeaderClient from "./headerClient"

export default async function Header() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    return (
        <HeaderClient userId={userId?.toString() ?? "Cant get one"} />
    )
}