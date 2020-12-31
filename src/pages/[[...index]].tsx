import { Layout } from '@layouts/Layout';
import { BlobPreview } from '@components/BlobPreview';
import { Controls } from '@components/Controls';
import { Info } from '@components/Info';
import { Footer } from '@components/Footer';

const Index = () => (
  <Layout title="Animated Blobs Generator - Create cool animated GIF or SVG shapes for your designs">
    <main>
      <BlobPreview />
      <Controls />
      <Info />
      <Footer />
    </main>
  </Layout>
);

export default Index;
