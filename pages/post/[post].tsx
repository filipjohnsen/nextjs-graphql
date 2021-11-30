import Layout from '@components/Layout';
import Post from '@components/Post';
import {
  PostDocument,
  PostQuery,
  PostQueryVariables,
  PostSlugsDocument,
  PostSlugsQuery,
  PostSlugsQueryVariables,
} from '@generated/graphql';
import { client } from '@lib/graphql';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostPageProps {
  data: PostQuery;
}

export const PostPage = ({ data }: PostPageProps) => {
  return (
    <Layout seo={data.post?.seo ?? {}}>
      <Post post={data.post} />
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const { data } = await client.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: {
      id: params?.post as string,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<PostSlugsQuery, PostSlugsQueryVariables>({
    query: PostSlugsDocument,
    variables: {
      first: 100,
    },
  });

  const paths = data?.posts?.nodes?.map?.((post) => `/post/${post?.slug}`) ?? [];

  return {
    paths,
    fallback: true,
  };
};
