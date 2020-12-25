import { Layout } from '@layouts/Layout';
import { BlobPreview } from '@components/BlobPreview';
import { Blob } from '@components/Blob';
import { Controls } from '@components/Controls';
import { Info } from '@components/Info';

const BLOB_SIZE = 480;

const Index = () => (
  <Layout title="Blobs Generator - Make GIF animation">
    <BlobPreview>
      <Blob
        id="logo-blob"
        width={BLOB_SIZE}
        height={BLOB_SIZE}
        colors={[{
          r: 138,
          g: 63,
          b: 252,
        }, {
          r: 158,
          g: 83,
          b: 252,
        }]}
        isLoop
        duration={5000}
        blobOptions={{
          size: BLOB_SIZE,
          extraPoints: 3,
          randomness: 3,
        }}
      />
    </BlobPreview>
    <Controls />
    <Info />
  </Layout>
);

export default Index;
