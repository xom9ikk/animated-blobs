import Head from 'next/head';
import { Header } from '@components/Header';

export const Layout = ({ children, title = 'Blobs Generator' }: any) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    {children}
  </>
);
