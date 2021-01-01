import {
  FC, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useClipboard from 'react-use-clipboard';
import { Slider } from '@components/Slider';
import { ColorPicker } from '@components/ColorPicker';
import { Button } from '@components/Button';
import { RandomButton } from '@components/RandomButton';
import { SystemActions } from '@store/actions';
import { IColor } from '@type/entitines';
import {
  getActiveBlobId, getBackgroundSrc, getBlob, getBlobs, getFps, getQuality, getSize, getSvg,
} from '@store/selectors';
import { useThrottle } from '@use/throttle';
import { useDownload } from '@use/download';
import { Modal } from '@components/Modal';
import { CodePreview } from '@components/CodePreview';
import { Tabs } from '@components/Tabs';
import { Tab } from '@components/Tab';
import { useUtils } from '@use/utils';
import { ConvertProgress } from '@components/ConvertProgress';
import { RecordButton } from '@components/RecordButton';

const NEW_BLOB_TAB_ID = 'new-blob';

export const Controls: FC<{}> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const backgroundSrc = useSelector(getBackgroundSrc);
  const activeBlobId = useSelector(getActiveBlobId);
  const currentBlob = useSelector(getBlob(activeBlobId));
  const svg = useSelector(getSvg);
  const fps = useSelector(getFps);
  const quality = useSelector(getQuality);
  const size = useSelector(getSize);
  const blobs = useSelector(getBlobs);

  const { downloadBlobParts } = useDownload();
  const { convertBlobIdToText } = useUtils();
  const [, copy] = useClipboard(svg);

  const handleRandomClick = useThrottle(() => {
    dispatch(SystemActions.setSeed({ id: activeBlobId, seed: Math.random() }));
  }, 250, [activeBlobId]);

  const handleFirstColorPick = (color: IColor) => {
    dispatch(SystemActions.setColor({
      id: activeBlobId,
      color,
      index: 0,
    }));
  };

  const handleSecondColorPick = (color: IColor) => {
    dispatch(SystemActions.setColor({
      id: activeBlobId,
      color,
      index: 1,
    }));
  };

  const handleRandomnessChange = useThrottle((randomness: number) => {
    dispatch(SystemActions.setRandomness({ id: activeBlobId, randomness }));
    handleRandomClick();
  }, 250, [activeBlobId]);

  const handleExtraPointsChange = useThrottle((extraPoints: number) => {
    dispatch(SystemActions.setExtraPoints({ id: activeBlobId, extraPoints }));
  }, 250, [activeBlobId]);

  const handleQualityChange = useThrottle((value: number) => {
    dispatch(SystemActions.setQuality(value));
  }, 250, [activeBlobId]);

  const handleFpsChange = useThrottle((value: number) => {
    dispatch(SystemActions.setFps(value));
  }, 250, [activeBlobId]);

  const handleSizeChange = useThrottle((value: number) => {
    dispatch(SystemActions.setSize(value));
  }, 250, [activeBlobId]);

  const handleOpacityChange = useThrottle((opacity: number) => {
    dispatch(SystemActions.setOpacity({ id: activeBlobId, opacity }));
  }, 250, [activeBlobId]);

  const handleDurationChange = useThrottle((duration: number) => {
    dispatch(SystemActions.setDuration({ id: activeBlobId, duration }));
  }, 250, [activeBlobId]);

  const handleDelayChange = useThrottle((delay: number) => {
    dispatch(SystemActions.setDelay({ id: activeBlobId, delay }));
  }, 250, [activeBlobId]);

  const handleDownload = () => {
    downloadBlobParts(svg, 'svg-blob', 'svg');
  };

  const handleShowCode = () => {
    setIsOpenModal(true);
  };

  const handleCopy = () => {
    copy();
    setIsCopied(true);
  };

  const handleCloseModel = () => {
    setIsOpenModal(false);
  };

  const handleTabChange = (id) => {
    if (typeof window !== 'undefined') {
      const path = id === 'gif' ? '/' : `/${id}`;
      router.push(path);
    }
  };

  const handleChangeActiveBlob = (id) => {
    if (id === NEW_BLOB_TAB_ID) {
      dispatch(SystemActions.addBlob());
    } else {
      dispatch(SystemActions.setActiveBlobId(id));
    }
  };

  const handleRemoveBlob = (id) => {
    dispatch(SystemActions.removeBlob(id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const activeRoute = router.asPath.split('/')[1];
  const normalizedActiveRoute = ['svg', 'gif'].includes(activeRoute) ? activeRoute : 'gif';

  if (normalizedActiveRoute === 'svg' && blobs[0]) {
    dispatch(SystemActions.setActiveBlobId(blobs[0].id));
  }

  return currentBlob ? (
    <div className="controls">
      <div
        className="controls__wrapper"
        style={{
          backgroundImage: `url("${backgroundSrc}")`,
        }}
      >
        <Tabs activeId={normalizedActiveRoute} onChange={handleTabChange}>
          <Tab id="gif" text="GIF animation">
            <div className="controls__panel">
              <div className="controls__panel-wrapper">
                <Tabs activeId={activeBlobId} onChange={handleChangeActiveBlob}>
                  {
                    blobs.map((blob) => (
                      <Tab
                        key={blob.id}
                        id={blob.id}
                        isRemovable={blobs.length !== 1}
                        onRemove={handleRemoveBlob}
                        text={convertBlobIdToText(blob.id)}
                      />
                    ))
                  }
                  <Tab
                    key={NEW_BLOB_TAB_ID}
                    id={NEW_BLOB_TAB_ID}
                    text="Add"
                    isDisabled
                    style={{ background: '#f5f6f7', borderRadius: 12 }}
                  />
                </Tabs>
                <div className="controls__panel--gif">
                  <Slider
                    min={1}
                    max={100}
                    value={currentBlob.opacity}
                    label="Opacity"
                    tooltip="Helps you adjust the transparency of each specific blob in the preview. The resulting GIF file will not have this translucency (see description at the bottom of the page)."
                    size="small"
                    onChange={handleOpacityChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${value} %`}
                  />
                  <Slider
                    min={100}
                    max={10000}
                    value={currentBlob.duration}
                    label="Duration"
                    tooltip="Time, in seconds, that it will take for a specific blob to transition from one state to another."
                    size="small"
                    onChange={handleDurationChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${(value / 1000).toFixed(2)} s`}
                  />
                  <Slider
                    min={1}
                    max={10000}
                    value={currentBlob.delay}
                    label="Delay"
                    tooltip="Delay for the first transition of a specific blob. It is needed to desynchronize state transition if duration is the same."
                    size="small"
                    onChange={handleDelayChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${(value / 1000).toFixed(2)} s`}
                  />
                </div>
                <div className="controls__panel--picker">
                  <ColorPicker
                    currentColor={currentBlob.colors[0]}
                    onColorPick={handleFirstColorPick}
                  />
                  <ColorPicker
                    currentColor={currentBlob.colors[1]}
                    onColorPick={handleSecondColorPick}
                    isRemovableColor
                  />
                </div>
                <div className="controls__panel--slider">
                  <Slider
                    minImageSrc="/svg/slider-randomness-min.svg"
                    maxImageSrc="/svg/slider-randomness-max.svg"
                    min={1}
                    max={30}
                    value={currentBlob.extraPoints}
                    onChange={handleExtraPointsChange}
                    isDisabledTrack
                  />
                  <Slider
                    minImageSrc="/svg/slider-points-min.svg"
                    maxImageSrc="/svg/slider-points-max.svg"
                    min={2}
                    max={30}
                    value={currentBlob.randomness}
                    onChange={handleRandomnessChange}
                    isDisabledTrack
                  />
                </div>
                <div className="controls__panel--gif">
                  <Slider
                    min={1}
                    max={60}
                    value={fps}
                    label="FPS"
                    tooltip="Number of frames per second for the output GIF animations."
                    size="small"
                    onChange={handleFpsChange}
                    isShowCurrentValue
                  />
                  <Slider
                    min={100}
                    max={2000}
                    value={size}
                    label="Size"
                    tooltip="Number of pixels that the GIF animations will contain (large values ​​can provoke a very long processing)."
                    size="small"
                    onChange={handleSizeChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${value}px`}
                  />
                  <Slider
                    min={1}
                    max={100}
                    value={quality}
                    label="Quality"
                    tooltip="Sets the quality of color quantization. Higher values produce better colors, but slow down processing significantly. The default value of 90 provides good color reproduction at a reasonable speed."
                    size="small"
                    onChange={handleQualityChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${value} %`}
                  />
                </div>
                <div className="controls__panel--buttons">
                  <RandomButton onClick={handleRandomClick}>
                    <img src="/svg/dice.svg" alt="dice" />
                  </RandomButton>
                  <RecordButton />
                </div>
                <div className="controls__panel--progress">
                  <ConvertProgress />
                </div>
              </div>
            </div>
          </Tab>
          <Tab id="svg" text="SVG static">
            <div className="controls__panel">
              <div className="controls__panel-wrapper">
                <div className="controls__panel--picker">
                  <ColorPicker
                    currentColor={currentBlob.colors[0]}
                    onColorPick={handleFirstColorPick}
                  />
                  <ColorPicker
                    currentColor={currentBlob.colors[1]}
                    onColorPick={handleSecondColorPick}
                    isRemovableColor
                  />
                </div>
                <div className="controls__panel--slider">
                  <Slider
                    minImageSrc="/svg/slider-randomness-min.svg"
                    maxImageSrc="/svg/slider-randomness-max.svg"
                    min={1}
                    max={30}
                    value={currentBlob.extraPoints}
                    onChange={handleExtraPointsChange}
                    isDisabledTrack
                  />
                  <Slider
                    minImageSrc="/svg/slider-points-min.svg"
                    maxImageSrc="/svg/slider-points-max.svg"
                    min={2}
                    max={30}
                    value={currentBlob.randomness}
                    onChange={handleRandomnessChange}
                    isDisabledTrack
                  />
                </div>
              </div>
              <div className="controls__panel--buttons">
                <Button
                  onClick={handleDownload}
                  mode="circle"
                >
                  <img src="/svg/download.svg" alt="download" />
                </Button>
                <Button
                  onClick={handleShowCode}
                  mode="circle"
                >
                  <img src="/svg/code.svg" alt="code" />
                </Button>
                <RandomButton onClick={handleRandomClick}>
                  <img src="/svg/dice.svg" alt="dice" />
                </RandomButton>
              </div>
            </div>
          </Tab>
        </Tabs>

      </div>
      <Modal
        isOpen={isOpenModal}
        title="Copy SVG code"
        positive={isCopied ? '👌 SVG copied to clipboard' : '🤙 Copy SVG to clipboard'}
        onPositive={handleCopy}
        onNegative={handleCloseModel}
        onClose={handleCloseModel}
      >
        <CodePreview>
          {svg}
        </CodePreview>
      </Modal>
    </div>
  ) : null;
};
