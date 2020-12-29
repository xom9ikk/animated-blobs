import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getBlobs } from '@store/selectors';
import { BlobSvg } from '@components/BlobSvg';
import { useRouter } from 'next/router';
import { BlobAggregator } from '@components/BlobAggregator';

const BLOB_PREVIEW_SIZE = 440;

export const BlobPreview : FC<{}> = () => {
  const router = useRouter();
  const isGif = router.asPath === '/gif';

  const blobs = useSelector(getBlobs);

  return blobs.length && (
    <div className="blob-preview">
      <div className="blob-preview__wrapper">
        <div className="blob-preview__inner">
          {
            isGif ? (
              <BlobAggregator previewSize={BLOB_PREVIEW_SIZE} />
            ) : (
              <BlobSvg
                width={BLOB_PREVIEW_SIZE}
                height={BLOB_PREVIEW_SIZE}
                colors={blobs[0].colors}
                blobOptions={{
                  size: BLOB_PREVIEW_SIZE,
                  extraPoints: blobs[0].extraPoints,
                  randomness: blobs[0].randomness,
                  seed: blobs[0].seed,
                }}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};
