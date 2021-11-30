import Layout from '@components/Layout';
import Post from '@components/Post';
import {
  CategoryPostsDocument,
  CategoryPostsQuery,
  CategoryPostsQueryVariables,
  CategorySlugsDocument,
  CategorySlugsQuery,
  CategorySlugsQueryVariables,
} from '@generated/graphql';
import { client } from '@lib/graphql';
import { GetStaticPaths, GetStaticProps } from 'next';

export interface CategorypageProps {
  data: CategoryPostsQuery;
}

export const Categorypage = ({ data }: CategorypageProps) => {
  return (
    <Layout seo={data.category?.seo ?? {}}>
      {data?.category?.posts?.nodes?.map((post) => (
        <Post key={post?.slug} post={post} />
      ))}
    </Layout>
  );
};

export default Categorypage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await client.query<CategoryPostsQuery, CategoryPostsQueryVariables>({
    query: CategoryPostsDocument,
    variables: {
      first: 10,
      category: context?.params?.category as string,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<CategorySlugsQuery, CategorySlugsQueryVariables>({
    query: CategorySlugsDocument,
    variables: {
      first: 100,
    },
  });
  const paths = data?.categories?.nodes?.map((category) => `/category/${category?.slug}`) ?? [];
  return {
    paths,
    fallback: false,
  };
};
