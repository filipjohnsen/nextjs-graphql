import { CategorySeoFragment, PostSeoFragment, TagSeoFragment } from '@generated/graphql';
import NextHead from 'next/head';

export type HeadProps = {
  seo: PostSeoFragment | CategorySeoFragment | TagSeoFragment;
};

export const Head = ({ seo }: HeadProps) => {
  return (
    <NextHead>
      <title>{seo?.title}</title>
      <meta name="description" content={seo?.metaDesc ?? ''} />
      <meta name="robots" content={seo?.metaRobotsNoindex ? 'noindex' : 'index'} />
    </NextHead>
  );
};

export default Head;
