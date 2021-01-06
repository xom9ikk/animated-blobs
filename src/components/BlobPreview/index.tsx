import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BlobSvg } from '@components/BlobSvg';
import { BlobAggregator } from '@components/BlobAggregator';
import { getBlobs, getIsRec } from '@store/selectors';
import { useBlobSize } from '@use/blob-size';

export const BlobPreview : FC<{}> = () => {
  const router = useRouter();
  const { blobSize } = useBlobSize();

  const isSvg = router.asPath === '/svg';

  const blobs = useSelector(getBlobs);
  const isRec = useSelector(getIsRec);

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
