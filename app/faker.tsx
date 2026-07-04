"use client"

import { faker } from '@faker-js/faker'
import Post, { postProps } from './post'
import { useEffect, useState } from 'react'

type postType = {
    id : string
    authorId : string
    title : string
    content : string
    createdAt : Date
    likes : number
}

export default function MockPosts() {
    const [posts, setPosts] = useState<postType[]>([])

    useEffect(() => {
        const generated = Array.from({ length : 61 }, () => ({
            id : faker.string.uuid(),
            authorId : faker.string.uuid(),
            title : faker.lorem.sentence({ min : 1, max : 6}),
            content : faker.lorem.paragraphs(),
            createdAt : faker.date.anytime(),
            likes : faker.number.int({ min : 0, max : 64 })
        }))
        

        setPosts(generated)
    }, [])

    return posts.map((post) => (
        <Post
            key={post.id}
            id={post.id}
            authorId={post.authorId}
            title={post.title}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
        />
    ))
}
