import Head from 'next/head';
import { Header } from '@components/Header';

export const MainLayout = ({ children, title = 'Blobs Generator' }: any) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    {children}
  </>
);
