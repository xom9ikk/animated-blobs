/* eslint-disable react/style-prop-object */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import * as blobs2 from 'blobs/v2';
import { useUtils } from '@use/utils';
import { IColors } from '@type/entitines';
import { useSvgBlob } from '@use/svg-blob';

interface IBlobOptions {
  seed?: number | string;
  randomness?: number;
  extraPoints?: number;
  size?: number;
}

interface IBlobSvg {
  width: number,
  height: number,
  colors: IColors,
  blobOptions?: IBlobOptions,
  seed: number,
}

export const BlobSvg: FC<IBlobSvg> = ({
  width,
  height,
  colors,
  blobOptions,
  seed,
}) => {
  const { getRandomInt } = useUtils();
  const { generateSvg } = useSvgBlob();

  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const defaultBlobOptions = {
      extraPoints: getRandomInt(3, 5),
      randomness: getRandomInt(15, 30),
      seed,
      size: getRandomInt(width - width / 5, width),
    };
    const svgPath = blobs2.svgPath({
      ...defaultBlobOptions,
      ...blobOptions,
    });
    setPath(svgPath);
  }, [seed, blobOptions]);

  const isGradient = colors[1] !== null;

  useEffect(() => {
    const svg = generateSvg(path, width, height, colors);
    console.log(svg);
  }, [path, width, height, colors]);

  return useMemo(() => (
    <svg
      width={width}
      height={height}
    >
      {
        isGradient && (
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                // @ts-ignore
                stopColor: colors[0],
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                // @ts-ignore
                stopColor: colors[1],
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
        )
      }
      <path
        d={path}
        fill={isGradient ? 'url(#gradient)' : (colors[0] || undefined)}
      />
    </svg>
  ), [path, colors, width, height]);
};
