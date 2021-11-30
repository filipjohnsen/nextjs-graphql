import { FeaturedImageFragment } from '@generated/graphql';
import Image from 'next/image';

export interface FeaturedImageProps {
  image: FeaturedImageFragment;
}

export const FeaturedImage = ({ image }: FeaturedImageProps) => {
  return (
    <figure>
      <Image
        src={image.node?.sourceUrl ?? ''}
        width={image.node?.mediaDetails?.width ?? 0}
        height={image.node?.mediaDetails?.height ?? 0}
        alt={image.node?.altText ?? ''}
      />
      {image.node?.caption && <figcaption>{image.node.caption}</figcaption>}
    </figure>
  );
};

export default FeaturedImage;
