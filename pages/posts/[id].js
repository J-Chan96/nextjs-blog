import Head from 'next/head';
import Layout from '../../\bcomponents/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../\bcomponents/Date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <articla>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <br />
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </articla>
        </Layout>
    );
}
