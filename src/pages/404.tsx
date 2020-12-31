import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  if (typeof window !== 'undefined' && !['/svg', '/'].includes(router.asPath)) {
    router.push('/');
  }
  return <></>;
};
