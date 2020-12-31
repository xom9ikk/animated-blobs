import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getBlobs, getIsRec } from '@store/selectors';
import { BlobSvg } from '@components/BlobSvg';
import { useRouter } from 'next/router';
import { BlobAggregator } from '@components/BlobAggregator';
import { useBlobSize } from '@use/blobSize';

// const BLOB_PREVIEW_SIZE = 440;

export const BlobPreview : FC<{}> = () => {
  const router = useRouter();
  const isSvg = router.asPath === '/svg';

  const blobs = useSelector(getBlobs);
  const isRec = useSelector(getIsRec);
  const { blobSize } = useBlobSize();

  return blobs.length > 0 && (
    <div className="blob-preview">
      <div className="blob-preview__wrapper">
        <div className={`blob-preview__inner ${isRec ? 'blob-preview__inner--rec' : ''}`}>
          {
            isSvg ? (
              <BlobSvg
                width={blobSize}
                height={blobSize}
                colors={blobs[0].colors}
                blobOptions={{
                  size: blobSize,
                  extraPoints: blobs[0].extraPoints,
                  randomness: blobs[0].randomness,
                  seed: blobs[0].seed,
                }}
              />
            ) : (
              <BlobAggregator previewSize={blobSize} />
            )
          }
        </div>
      </div>
    </div>
  );
};
