import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  router.push('/svg');
};
