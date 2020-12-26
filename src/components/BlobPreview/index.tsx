import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getColors, getRandomness, getExtraPoints, getSeed,
} from '@store/selectors';
import { BlobSvg } from '@components/BlobSvg';

const BLOB_SIZE = 440;

export const BlobPreview : FC<{}> = () => {
  const colors = useSelector(getColors);
  const randomness = useSelector(getRandomness);
  const extraPoints = useSelector(getExtraPoints);
  const seed = useSelector(getSeed);

  const blobOptions = useMemo(() => ({
    size: BLOB_SIZE,
    extraPoints,
    randomness,
  }), [extraPoints, randomness]);

  return (
    <div className="blob-preview">
      <div className="blob-preview__wrapper">
        <div className="blob-preview__inner">
          {/* <Blob */}
          {/*  id="blob-preview" */}
          {/*  width={BLOB_SIZE} */}
          {/*  height={BLOB_SIZE} */}
          {/*  colors={colors} */}
          {/*  isLoop */}
          {/*  duration={5000} */}
          {/*  blobOptions={{ */}
          {/*    size: BLOB_SIZE, */}
          {/*    extraPoints: 3, */}
          {/*    randomness: 3, */}
          {/*  }} */}
          {/* /> */}
          <BlobSvg
            width={BLOB_SIZE}
            height={BLOB_SIZE}
            colors={colors}
            blobOptions={blobOptions}
            seed={seed}
          />
        </div>
      </div>
    </div>
  );
};
