/* eslint-disable */
import {GIFEncoder} from '../lib/jsgif';
import {EnumWorkerType} from "@type/workers/gif";
import {useRef} from "react";
import {useNonBlockingLoop} from "@use/non-blocking-loop";
import {useDownload} from "@use/download";

const defaultOptions = {
  fps: 30,
  quality: 90,
  downloadFileName: 'captured',
  loopToInitialState: true,
};

enum EnumProgressType {
  Done = 'done',
  Progress = 'progress',
}

interface IProgress {
  id: string;
  type: EnumProgressType;
  progress?: number;
}

interface IOptions {
  id: string;
  fps: number;
  quality: number;
  downloadFileName: string;
  loopToInitialState: boolean;
  width: number;
  height: number;
}

type IEndRecording = () => void;
type IStartWorker = (payload: IOptions, imagesData: Array<ImageData>) => Promise<void>;
type IStopWorker = () => void;
type IRecordFrame = (canvas: OffscreenCanvas | HTMLCanvasElement) => void;
type ICreateContext = (canvas: OffscreenCanvas | HTMLCanvasElement) => OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
type IExtractImageData = () => void;
type IAddFrames = (encoder: any, isRevert: boolean) => void;
type ISendImageDataToWorker = (imagesData: Array<ImageData>) => void;
type IRunEncoderInMainThread = (payload: IOptions) => void;

interface ICtx {
  worker: Worker;
  ctxData: Array<OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D>;
  imagesData: Array<ImageData>;
  index: number;
  interval: number;
  onProgress: (progress: IProgress) => void;
  options: IOptions;
}

export const useCaptureCanvas = () => {
  const ctx = useRef<ICtx>();

  const { nonBlockingLoop } = useNonBlockingLoop();
  const { downloadBlobParts } = useDownload();

  const setOptions = (options, onProgress) => {
    ctx.current = {
      worker: undefined,
      ctxData: [],
      imagesData: [],
      index: 0,
      interval: 0,
      options:{
        ...defaultOptions,
        ...options,
      },
      onProgress,
    };
  }

  const endRecording: IEndRecording = async () => {
    await extractImageData();
    startWorker({
      ...ctx.current.options,
      quality: 100 - ctx.current.options.quality,
    }, ctx.current.imagesData)
        .catch(console.error);
  };

  const getWorker = () => new Worker("../workers/gif.worker", {
    type: "module",
  });


  const startWorker: IStartWorker = async (payload, imagesData) => {
    const isAvailableWorker = window.Worker !== undefined;
    if (isAvailableWorker) {
      if (ctx.current.worker === undefined) {
        ctx.current.worker = getWorker();
        await sendImageDataToWorker(imagesData);
        ctx.current.worker.postMessage({
          type: EnumWorkerType.Start,
          payload,
        });
      }
      ctx.current.worker.onmessage = (event) => {
        const {type, payload: workerPayload} = event.data;
        switch (type) {
          case EnumWorkerType.Result: {
            ctx.current.onProgress({type: EnumProgressType.Done, id: ctx.current.options.id})
            downloadBlobParts(new Uint8Array(workerPayload), payload.downloadFileName, 'gif');
            ctx.current.ctxData = [];
            ctx.current.imagesData = [];
            stopWorker();
            break;
          }
          case EnumWorkerType.Progress: {
            ctx.current.onProgress({...workerPayload, type: EnumProgressType.Progress});
            break;
          }
          default:
            throw 'Invalid type';
        }
      };
    } else {
      console.log('Browser does not support Web Workers... Run task in main thread');
      await runEncoderInMainThread(payload);
    }
  };

  const stopWorker: IStopWorker = () => {
    ctx.current.worker.terminate();
    ctx.current.worker = undefined;
  };

  const recordFrame: IRecordFrame = (canvas) => {
    const canvasContext = createContext(canvas);
    canvasContext.drawImage(canvas, 0, 0);
    ctx.current.ctxData.push(canvasContext);
    ctx.current.index += 1;
  };

  const createContext: ICreateContext = (canvas) => {
    const isAvailableOffscreenCanvas = window.OffscreenCanvas;

    let cvs: HTMLCanvasElement | OffscreenCanvas;
    if (isAvailableOffscreenCanvas) {
      cvs = new OffscreenCanvas(canvas.width, canvas.height);
    } else {
      cvs = document.createElement("canvas");
      cvs.width = canvas.width;
      cvs.height = canvas.height;
    }
    return cvs.getContext('2d');
  };

  const extractImageData: IExtractImageData = () => {
    return new Promise((resolve) => {
      nonBlockingLoop(ctx.current.ctxData.length, (i) => {
        const canvasContext = ctx.current.ctxData[i];
        const imageData = canvasContext.getImageData(0, 0, ctx.current.options.width, ctx.current.options.height);
        ctx.current.imagesData.push(imageData);
      }, resolve, false);
    })
  }

  const addFrames: IAddFrames = (encoder, isRevert) => {
    return new Promise((resolve) => {
      nonBlockingLoop(ctx.current.imagesData.length, (i) => {
        encoder.addFrame(ctx.current.imagesData[i], true);
      }, resolve, isRevert);
    })
  }

  const sendImageDataToWorker: ISendImageDataToWorker = (imagesData) => {
    return new Promise((resolve) => {
      nonBlockingLoop(imagesData.length, (i) => {
        ctx.current.worker.postMessage({
          type: EnumWorkerType.ImageData,
          payload: imagesData[i],
        })
      }, resolve, false);
    })
  }

  const runEncoderInMainThread: IRunEncoderInMainThread = async ({
    fps,
    quality,
    loopToInitialState,
    downloadFileName,
  }) => {
    // @ts-ignore
    const encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / fps);
    encoder.setQuality(quality);
    encoder.setTransparent([0x00, 0x00, 0x00]);
    encoder.start();

    await addFrames(encoder, false);

    if (loopToInitialState) {
      await addFrames(encoder, true);
    }

    encoder.finish();
    const output = encoder.getOutput();
    downloadBlobParts(new Uint8Array(output), downloadFileName, 'gif');
    ctx.current.ctxData = [];
    ctx.current.imagesData = [];
  };

  return {
    setOptions,
    recordFrame,
    endRecording,
  }
};
