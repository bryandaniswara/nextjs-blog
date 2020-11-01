import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostsData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={postData.date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	// return a list of possible value for id
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// fetch necessary data for the blog post using params.id
	const postData = await getPostsData(params.id);
	return {
		props: {
			postData,
		},
	};
}
