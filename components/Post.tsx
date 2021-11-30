import { Maybe, PostPreviewFragment } from '@generated/graphql';
import Link from 'next/link';
import FeaturedImage from '@components/FeaturedImage';

export interface PostProps {
  post?: Maybe<PostPreviewFragment>;
}

export const Post = ({ post }: PostProps) => {
  return (
    <div>
      <h2>{post?.title}</h2>
      <FeaturedImage image={post?.featuredImage ?? {}} />
      <div dangerouslySetInnerHTML={{ __html: post?.excerpt ?? '' }} />
      <Link href={`/post/${post?.slug}`}>Link</Link>
    </div>
  );
};

export default Post;
