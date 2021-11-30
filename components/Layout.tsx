import Head, { HeadProps } from '@components/Head';

export type LayoutProps = HeadProps & {};

export const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  return (
    <div>
      <Head seo={seo} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
