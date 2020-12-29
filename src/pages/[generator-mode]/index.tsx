import { Layout } from '@layouts/Layout';
import { BlobPreview } from '@components/BlobPreview';
import { Controls } from '@components/Controls';
import { Info } from '@components/Info';
import { Footer } from '@components/Footer';

const Index = () => (
  <Layout title="Blobs Generator - Make GIF animation">
    <main>
      <BlobPreview />
      <Controls />
      <Info />
      <Footer />
    </main>
  </Layout>
);

export default Index;
