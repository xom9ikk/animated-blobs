/* eslint-disable */
import { GIFEncoder } from './jsgif';

const defaultOptions = {
  fps: 30,
  quality: 30,
  downloadFileName: 'captured.gif',
  loopToInitialState: true,
};

export class CaptureCanvas {
  constructor(options) {
    console.log('new Capture', options);
    this.worker = undefined;
    this.ctxData = [];
    this.imagesData = [];
    this.index = 0;
    this.interval = 0;
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  startWorker = (payload, imagesData) => {
    console.log('start worker...', payload);
    if (Worker !== undefined) {
      if (this.worker === undefined) {
        this.worker = new Worker('worker.js', { type: 'module' });
        imagesData.map((imageData) => this.worker.postMessage({
          type: 'imageData',
          payload: imageData,
        }));
        this.worker.postMessage({
          type: 'start',
          payload,
        });
      }
      this.worker.onmessage = (event) => {
        const { type, payload } = event.data;
        switch (type) {
          case 'result': {
            this.downloadGif(payload);
            this.stopWorker();
            console.log('STOP worker', payload);
            break;
          }
          case 'progress': {
            console.log(payload);
            break;
          }
          default:
            throw 'Invalid type';
        }
      };
    } else {
      console.log('Browser does not support Web Workers...');
      this.runEncoderInMainThread(payload);
    }
  };

  stopWorker = () => {
    this.worker.terminate();
    this.worker = undefined;
  };

  downloadGif = (output) => {
    const { downloadFileName } = this.options;
    const name = downloadFileName.endsWith('.gif') ? downloadFileName : `${downloadFileName}.gif`;
    const link = document.createElement('a');
    link.download = name;
    link.href = URL.createObjectURL(new Blob([new Uint8Array(output)], { type: 'image/gif' }));
    link.click();
    this.ctxData = [];
    this.imagesData = [];
    console.log('Downloaded', name)
  };

  recordFrame = (canvas) => {
    const ctx = this.createContext(canvas);
    ctx.drawImage(canvas, 0, 0);
    this.ctxData.push(ctx);
    this.index += 1;
  };

  createContext = (canvas) => {
    const cvs = new OffscreenCanvas(canvas.width, canvas.height);
    return cvs.getContext('2d');
  };

  nonBlockingIncrement = (n, callback, done, isRevert) => {
    let i = isRevert ? n - 1 : 0;
    const step = isRevert ? -1 : 1;

    const loop = () => {
      const isNeedLoop = isRevert ? i >= 0 : i < n
      if (isNeedLoop) {
        callback(i, false);
        i += step;
        (window.requestAnimationFrame || window.setTimeout)(loop);
      }
      else {
        done();
      }
    }

    loop();
  }

  extractImageData = () => {
    return new Promise((resolve) => {
      this.nonBlockingIncrement(this.ctxData.length, (i) => {
        const ctx = this.ctxData[i];
        const imageData = ctx.getImageData(0, 0, this.options.width, this.options.height);
        this.imagesData.push(imageData)
      }, resolve);
    })
  }

  endRecording = async () => {
    await this.extractImageData();
    this.startWorker({
      id: this.options.id,
      fps: this.options.fps,
      quality: this.options.quality,
      loopToInitialState: this.options.loopToInitialState,
      downloadFileName: this.options.downloadFileName,
      index: this.index,
    }, this.imagesData);
  };

  addFrames = (encoder, isRevert) => {
    return new Promise((resolve) => {
      this.nonBlockingIncrement(this.imagesData.length, (i) => {
        encoder.addFrame(this.imagesData[i], true);
      }, resolve, isRevert);
    })
  }

  runEncoderInMainThread = async ({
    fps,
    quality,
    loopToInitialState,
  }) => {
    const encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / fps);
    encoder.setQuality(quality);
    encoder.setTransparent([0x00, 0x00, 0x00]);
    encoder.start();

    await this.addFrames(encoder, false);

    if (loopToInitialState) {
      await this.addFrames(encoder, true);
    }

    encoder.finish();
    const output = encoder.getOutput();
    this.downloadGif(output);
  };
}
