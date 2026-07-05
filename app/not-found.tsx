import Header from "./header"
import Link from "next/link"

export default function Custom404() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="text-4xl">
                Error 404 : Not found
            </h2>

            <Link href="/">
                Go back to main page
            </Link>
        </div>
    )
}