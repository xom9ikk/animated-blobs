import {
  FC, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { getBlobs } from '@store/selectors';
import { BlobSvg } from '@components/BlobSvg';
import { useRouter } from 'next/router';
import { BlobAggregator } from '@components/BlobAggregator';

const BLOB_SIZE = 440;

export const BlobPreview : FC<{}> = () => {
  const router = useRouter();
  const isGif = router.asPath === '/gif';

  const resultedCanvas = useRef<HTMLCanvasElement | null>(null);
  const resultedCanvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  const blobs = useSelector(getBlobs);

  const handleMergedFrames = (frame: CanvasImageSource) => {
    resultedCanvasCtx.current!.drawImage(frame, 0, 0);
  };

  const handleNextFrame = () => {
    resultedCanvasCtx.current!.clearRect(0, 0, BLOB_SIZE, BLOB_SIZE);
  };

  return (
    <div className="blob-preview">
      <div className="blob-preview__wrapper">
        <div className="blob-preview__inner">
          {
            isGif ? (
              <>
                <BlobAggregator
                  onFrames={handleMergedFrames}
                  onNextFrame={handleNextFrame}
                />
                <canvas
                  ref={(ref) => {
                    if (resultedCanvas.current === null) {
                      resultedCanvas.current = ref;
                      resultedCanvas.current!.width = BLOB_SIZE;
                      resultedCanvas.current!.height = BLOB_SIZE;
                      resultedCanvasCtx.current = resultedCanvas.current!.getContext('2d');
                    }
                  }}
                  width={BLOB_SIZE}
                  height={BLOB_SIZE}
                />
                {/* <Blob */}
                {/*  id="blob-preview" */}
                {/*  width={BLOB_SIZE} */}
                {/*  height={BLOB_SIZE} */}
                {/*  colors={colors} */}
                {/*  duration={duration} */}
                {/*  opacity={opacity} */}
                {/*  blobOptions={blobOptions} */}
                {/*  onFrame={handleFrame} */}
                {/* /> */}
                {/* <Blob */}
                {/*  id="blob-1preview" */}
                {/*  width={BLOB_SIZE} */}
                {/*  height={BLOB_SIZE} */}
                {/*  colors={colors} */}
                {/*  duration={duration} */}
                {/*  opacity={opacity} */}
                {/*  blobOptions={blobOptions} */}
                {/*  onFrame={handleFrame} */}
                {/* /> */}
              </>
            ) : (
              <BlobSvg
                width={BLOB_SIZE}
                height={BLOB_SIZE}
                colors={blobs[0].colors}
                blobOptions={{
                  size: BLOB_SIZE,
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
