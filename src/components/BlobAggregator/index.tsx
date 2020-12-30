import {
  FC, useEffect, useMemo, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import {
  getSize, getBlobs, getIsRec, getQuality, getFps,
} from '@store/selectors';
import { Blob } from '@components/Blob';

interface IBlobAggregator {
  previewSize: number;
}

export const BlobAggregator : FC<IBlobAggregator> = ({
  previewSize,
}) => {
  const blobsData = useRef<any>();
  const blobKeys = useRef<any>();
  const processedFrame = useRef<any>(0);
  const previewSizeRef = useRef<any>(0);

  const resultedCanvas = useRef<HTMLCanvasElement | null>(null);
  const resultedCanvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  const size = useSelector(getSize);
  const fps = useSelector(getFps);
  const quality = useSelector(getQuality);
  const isRec = useSelector(getIsRec);
  const blobs = useSelector(getBlobs);

  useEffect(() => {
    blobsData.current = blobs.reduce((acc, blob) => ({
      ...acc,
      [blob.id]: [],
    }), {});
    blobKeys.current = Object.keys(blobsData.current);
    processedFrame.current = 0;
  }, [blobs.length]);

  useEffect(() => {
    processedFrame.current = 0;
  }, [blobs.length]);

  useEffect(() => {
    previewSizeRef.current = previewSize;
  }, [previewSize]);

  const mergeFrame = () => {
    const keys = blobKeys.current;
    resultedCanvasCtx.current?.clearRect(0, 0, previewSizeRef.current, previewSizeRef.current);
    for (let i = 0; i < keys.length; i += 1) {
      const frame = blobsData.current[keys[i]][processedFrame.current];
      try {
        resultedCanvasCtx.current.drawImage(
          frame, 0, 0, previewSizeRef.current, previewSizeRef.current,
        );
      } catch (e) {
        // console.error(e);
      }
    }
  };

  const handleFrame = (id: string, canvasElement: HTMLCanvasElement) => {
    if (blobsData.current[id]) {
      blobsData.current[id].push(canvasElement);
    }
    const isReadyForProcess = blobKeys.current
      .every((key: string) => blobsData.current[key][processedFrame.current] !== undefined);
    if (isReadyForProcess && id === blobKeys.current[0]) {
      mergeFrame();
      processedFrame.current += 1;
    }
  };

  return useMemo(() => (
    <>
      <canvas
        ref={(ref) => {
          if (resultedCanvas.current === null) {
            resultedCanvas.current = ref;
            resultedCanvas.current!.width = previewSize;
            resultedCanvas.current!.height = previewSize;
            resultedCanvasCtx.current = resultedCanvas.current!.getContext('2d');
          }
        }}
        width={previewSize}
        height={previewSize}
      />
      <div className="blob-aggregator">
        {
          blobs.length > 0 && blobs.map((blob) => (
            <Blob
              isRec={isRec}
              key={blob.id}
              id={blob.id}
              width={size}
              height={size}
              colors={blob.colors}
              duration={blob.duration}
              opacity={blob.opacity}
              delay={blob.delay}
              randomness={blob.randomness}
              extraPoints={blob.extraPoints}
              seed={blob.seed}
              fps={fps}
              quality={quality}
              onFrame={handleFrame}
            />
          ))
        }
      </div>
    </>
  ), [blobs, previewSize, isRec, size, fps, quality]);
};
