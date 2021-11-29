import Post from '@components/Post';
import {
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  usePostSeoQuery,
  usePostsQuery,
} from '@generated/graphql';
import { client } from '@lib/graphql';
import type { GetStaticProps, NextPage } from 'next';

interface HomeProps {
  data: PostsQuery;
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const { data: seodata, loading } = usePostSeoQuery();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data?.posts?.nodes?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await client.query<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    variables: {
      first: 100,
    },
  });

  return {
    props: {
      data,
    },
  };
};
