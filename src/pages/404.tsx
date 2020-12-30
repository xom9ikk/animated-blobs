import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push('/svg');
  }
  return <></>;
};
