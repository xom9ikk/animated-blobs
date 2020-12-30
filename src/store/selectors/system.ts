import { IRootState } from '@store/state';

export const getBackgroundSvg = (state: IRootState) => state.system.backgroundSvg;
export const getActiveBlobId = (state: IRootState) => state.system.activeBlobId;
export const getBlobs = (state: IRootState) => state.system.blobs;
export const getBlob = (id: string) => (state: IRootState) => state.system.blobs
  .find((blob) => blob.id === id);
export const getSvg = (state: IRootState) => state.system.svg;
export const getQuality = (state: IRootState) => state.system.quality;
export const getFps = (state: IRootState) => state.system.fps;
export const getSize = (state: IRootState) => state.system.size;
export const getIsRec = (state: IRootState) => state.system.isRec;
export const getConvertProcess = (state: IRootState) => state.system.convertProgress;
