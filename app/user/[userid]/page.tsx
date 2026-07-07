import prisma from "@/lib/db"
import AnonProfile from '@/public/assets/icons/mdi--user.svg'
import Posts from "@/app/post"

export default async function UserProfile({
    params
} : {
    params : Promise<{ userid : string}>
}) {
    const { userid } = await params

    const user = await prisma.user.findUnique({
        where : {
            id : userid
        },
        include : {
            _count : {
                select : {
                    replies : true,
                    posts : true
                }
            }
        }
    })

    return (
        <>
        <section>
            <div className="flex flex-col gap-4">
                <div className="border-2 rounded-2xl p-4">
                    <div className="flex items-center">
                        <div className="w-24 border-2 rounded-full p-4">
                            <AnonProfile
                                className="w-full h-full"
                            />
                        </div>

                        <p className="flex-1 text-end text-4xl">
                            {user?.id}
                        </p>
                    </div>
                    
                    {user?.description && (
                        <p className="mt-4 text-4xl col-span-2">
                            {user.description}
                        </p>
                    )}
                </div>

                <div className="border-2 rounded-2xl p-4">
                    <p>
                        Created at : {user?.createdAt.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <p>
                        Posts created : {user?._count.posts}
                    </p>

                    <p>
                        Replies created : {user?._count.replies}
                    </p>
                </div>
            </div>
        </section>

        <section className="flex flex-col gap-4">
            <h1 className="text-4xl">
                Posts
            </h1>

            <Posts
                fromUserId={userid}
            />
        </section>

        </>
    )
}