import Layout from '@components/Layout';
import Post from '@components/Post';
import {
  TagPostsDocument,
  TagPostsQuery,
  TagPostsQueryVariables,
  TagSlugsDocument,
  TagSlugsQuery,
  TagSlugsQueryVariables,
} from '@generated/graphql';
import { client } from '@lib/graphql';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';

export interface TagPageProps {
  data: TagPostsQuery;
}

const TagPage: NextPage<TagPageProps> = ({ data }: TagPageProps) => {
  return (
    <Layout seo={data.tag?.seo ?? {}}>
      <h1>{data.tag?.name}</h1>
      {data.tag?.posts?.nodes?.map((post) => (
        <Post key={post?.slug} post={post} />
      ))}
    </Layout>
  );
};

export default TagPage;

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const { data } = await client.query<TagPostsQuery, TagPostsQueryVariables>({
    query: TagPostsDocument,
    variables: {
      first: 10,
      tag: params?.tag as string,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<TagSlugsQuery, TagSlugsQueryVariables>({
    query: TagSlugsDocument,
    variables: {
      first: 100,
    },
  });

  const paths = data?.tags?.nodes?.map?.((tag) => `/tag/${tag?.slug}`) ?? [];
  return {
    paths,
    fallback: false,
  };
};
