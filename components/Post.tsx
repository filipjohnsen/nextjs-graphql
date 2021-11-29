import { FrontPagePostFragment, Maybe } from '@generated/graphql';

export interface PostProps {
  post?: Maybe<FrontPagePostFragment>;
}

export const Post = ({ post }: PostProps) => {
  return (
    <div>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.excerpt ?? '' }} />
    </div>
  );
};

export default Post;
