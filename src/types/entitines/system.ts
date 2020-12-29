export type IColor = string | null;
export type IColors = Array<IColor>;

interface IBlob {
  id: string;
  colors: IColors;
  randomness: number;
  extraPoints: number;
  seed: number;
  opacity: number;
  duration: number;
  delay: number;
}

export interface ISystem {
  backgroundSvg: string;
  activeBlobId: string;
  blobs: Array<IBlob>;
  svg: string;
  quality: number;
  fps: number;
  size: number;
  isRec: boolean;
}
