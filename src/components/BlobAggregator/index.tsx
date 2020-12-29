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

  const resultedCanvas = useRef<HTMLCanvasElement | null>(null);
  const resultedCanvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  const size = useSelector(getSize);
  const fps = useSelector(getFps);
  const quality = useSelector(getQuality);
  const isRec = useSelector(getIsRec);
  const blobs = useSelector(getBlobs);

  useEffect(() => {
    console.log('start reduce');
    blobsData.current = blobs.reduce((acc, blob) => ({
      ...acc,
      [blob.id]: [],
    }), {});
    blobKeys.current = Object.keys(blobsData.current);
    processedFrame.current = 0;
    console.log('end reduce');
  }, [blobs.length]);

  const mergeFrame = () => {
    console.log('start mergeFrame');
    const keys = blobKeys.current;
    resultedCanvasCtx.current?.clearRect(0, 0, previewSize, previewSize);
    console.log('clearRect mergeFrame');
    for (let i = 0; i < keys.length; i += 1) {
      const frame = blobsData.current[keys[i]][processedFrame.current];
      try {
        console.log('clearRect drawImage');
        resultedCanvasCtx.current.drawImage(frame, 0, 0, previewSize, previewSize);
      } catch (e) {
        // console.error(e);
      }
    }
  };

  const handleFrame = (id: string, canvasElement: HTMLCanvasElement) => {
    blobsData.current[id].push(canvasElement);
    console.log('handleFrame');
    const isReadyForProcess = blobKeys.current
      .every((key: string) => blobsData.current[key][processedFrame.current] !== undefined);
    if (isReadyForProcess && id === blobs[0].id) {
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