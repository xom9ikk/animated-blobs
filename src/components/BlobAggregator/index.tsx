import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSize, getBlobs } from '@store/selectors';
import { Blob } from '@components/Blob';

interface IBlobAggregator {
  onFrames: (frame: CanvasImageSource) => void,
  onNextFrame: () => void;
}

export const BlobAggregator : FC<IBlobAggregator> = ({
  onFrames,
  onNextFrame,
}) => {
  const blobsData = useRef<any>();
  const blobKeys = useRef<any>();
  const processedFrame = useRef<any>(0);

  const size = useSelector(getSize);
  const blobs = useSelector(getBlobs);

  useEffect(() => {
    blobsData.current = blobs.reduce((acc, blob) => ({
      ...acc,
      [blob.id]: [],
    }), {});
    blobKeys.current = Object.keys(blobsData.current);
  }, []);

  const mergeFrame = () => {
    const keys = blobKeys.current;
    onNextFrame();
    for (let i = 0; i < keys.length; i += 1) {
      const frame = blobsData.current[keys[i]][processedFrame.current];
      onFrames(frame);
    }
  };

  const handleFrame = (id: string, _imageData: ImageData, canvasElement: HTMLCanvasElement) => {
    // if (!blobKeys.current) return;
    blobsData.current[id].push(canvasElement);
    const isReadyForProcess = blobKeys.current
      .every((key: string) => blobsData.current[key][processedFrame.current] !== undefined);
    if (isReadyForProcess && id === blobs[0].id) {
      mergeFrame();
      processedFrame.current += 1;
    }
  };

  return (
    <div className="blob-aggregator">
      {
        blobs.length > 0 && blobs.map((blob) => (
          <Blob
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
            // blobOptions={{
            //   randomness: blob.randomness,
            //   extraPoints: blob.extraPoints,
            //   seed: blob.seed,
            // }}
            onFrame={handleFrame}
          />
        ))
      }
    </div>
  );
};
