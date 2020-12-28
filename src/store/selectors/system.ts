import { IRootState } from '@store/state';

export const getActiveBlobId = (state: IRootState) => state.system.activeBlobId;
export const getBlobs = (state: IRootState) => state.system.blobs;
export const getColors = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.colors;
export const getRandomness = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.randomness;
export const getExtraPoints = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.extraPoints;
export const getSeed = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.seed;
export const getOpacity = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.opacity;
export const getDuration = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.duration;
export const getDelay = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id)?.delay;
export const getSvg = (state: IRootState) => state.system.svg;
export const getQuality = (state: IRootState) => state.system.quality;
export const getFps = (state: IRootState) => state.system.fps;
export const getSize = (state: IRootState) => state.system.size;
export const getIsRec = (state: IRootState) => state.system.isRec;
