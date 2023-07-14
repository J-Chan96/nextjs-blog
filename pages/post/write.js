import Layout from '../../\bcomponents/Layout';
import { useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Write() {
    const idRef = useRef(undefined);
    const titleRef = useRef(undefined);
    const contentRef = useRef(undefined);

    const [showLink, setShowLink] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = idRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if (id && title && content) {
            const response = await axios.post(
                '/api/post/write',
                {
                    id,
                    title,
                    content,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setShowLink(true);
            return alert('good');
        } else {
            alert(`request error: ${error}`);
        }
    };

    return (
        <Layout>
            <h1>Write a post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    placeholder="id"
                    required
                    ref={idRef}
                />
                <br />
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    required
                    ref={titleRef}
                />
                <br />
                <textarea
                    type="text"
                    name="content"
                    placeholder="content"
                    required
                    ref={contentRef}
                />
                <br />
                <input type="submit" value="Create" />
            </form>
            {showLink && (
                <Link href={`/posts/${idRef.current.value}`}>Created Post</Link>
            )}
        </Layout>
    );
}
