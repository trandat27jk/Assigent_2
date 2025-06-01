import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Dynamically set the <title> in the browser tab */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        {/* Title with large heading style */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        {/* Date formatted with light style */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        {/* Render markdown content as HTML */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // Return 404 if path not returned
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
