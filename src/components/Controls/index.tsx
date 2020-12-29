import {
  FC, useEffect, useState,
} from 'react';
import { Slider } from '@components/Slider';
import { ColorPicker } from '@components/ColorPicker';
import { Button } from '@components/Button';
import { RandomButton } from '@components/RandomButton';
import { useDispatch, useSelector } from 'react-redux';
import { SystemActions } from '@store/actions';
import { IColor } from '@type/entitines';
import {
  getActiveBlobId, getBackgroundSvg,
  getColors, getSvg,
} from '@store/selectors';
import { useThrottle } from '@use/throttle';
import { useDownload } from '@use/download';
import { Modal } from '@components/Modal';
import { CodePreview } from '@components/CodePreview';
import { Tabs } from '@components/Tabs';
import { Tab } from '@components/Tab';
import { useRouter } from 'next/router';

export const Controls: FC<{}> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const backgroundSvg = useSelector(getBackgroundSvg);
  const activeBlobId = useSelector(getActiveBlobId);
  const currentColors = useSelector(getColors(activeBlobId));
  const svg = useSelector(getSvg);

  const { downloadText } = useDownload();

  const handleRandomClick = useThrottle(() => {
    dispatch(SystemActions.setSeed({ id: activeBlobId, seed: Math.random() }));
  }, 250);

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
  }, 250);

  const handleExtraPointsChange = (extraPoints: number) => {
    dispatch(SystemActions.setExtraPoints({ id: activeBlobId, extraPoints }));
  };

  const handleQualityChange = useThrottle((quality: number) => {
    dispatch(SystemActions.setQuality(quality));
  }, 250);

  const handleFpsChange = useThrottle((fps: number) => {
    dispatch(SystemActions.setFps(fps));
  }, 250);

  const handleSizeChange = useThrottle((size: number) => {
    dispatch(SystemActions.setSize(size));
  }, 250);

  const handleOpacityChange = useThrottle((opacity: number) => {
    dispatch(SystemActions.setOpacity({ id: activeBlobId, opacity }));
  }, 250);

  const handleDurationChange = useThrottle((duration: number) => {
    dispatch(SystemActions.setDuration({ id: activeBlobId, duration }));
  }, 250);

  const handleDelayChange = useThrottle((delay: number) => {
    dispatch(SystemActions.setDelay({ id: activeBlobId, delay }));
  }, 250);

  const handleDownload = () => {
    downloadText(svg, 'svg-blob', 'svg');
  };

  const handleShowCode = () => {
    setIsOpenModal(true);
  };
  const handleRec = () => {
    dispatch(SystemActions.switchIsRec());
  };

  const handleCopy = () => {
    setIsCopied(true);
  };

  const handleCloseModel = () => {
    setIsOpenModal(false);
  };

  const handleTabChange = (id) => {
    console.log('handleTabChange');
    if (typeof window !== 'undefined') {
      router.push(`/${id}`);
    }
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
  const normalizedActiveRoute = ['svg', 'gif'].includes(activeRoute) ? activeRoute : 'svg';

  return (
    <div className="controls">
      <div
        className="controls__wrapper"
        style={{
          backgroundImage: `url("${backgroundSvg}")`,
        }}
      >
        <div className="controls__panel">
          <Tabs activeId={normalizedActiveRoute} onChange={handleTabChange}>
            <Tab id="svg" text="SVG static">
              <div className="controls__panel-wrapper">
                <div className="controls__panel--picker">
                  <ColorPicker
                    currentColor={currentColors[0]}
                    onColorPick={handleFirstColorPick}
                  />
                  <ColorPicker
                    currentColor={currentColors[1]}
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
                    defaultValue={5}
                    onChange={handleExtraPointsChange}
                    isDisabledTrack
                  />
                  <Slider
                    minImageSrc="/svg/slider-points-min.svg"
                    maxImageSrc="/svg/slider-points-max.svg"
                    min={2}
                    max={30}
                    defaultValue={5}
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
            </Tab>
            <Tab id="gif" text="GIF animation">
              <div className="controls__panel-wrapper">
                <div className="controls__panel--gif">
                  <Slider
                    min={1}
                    max={100}
                    defaultValue={100}
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
                    defaultValue={1000}
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
                    defaultValue={0}
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
                    currentColor={currentColors[0]}
                    onColorPick={handleFirstColorPick}
                  />
                  <ColorPicker
                    currentColor={currentColors[1]}
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
                    defaultValue={5}
                    onChange={handleExtraPointsChange}
                    isDisabledTrack
                  />
                  <Slider
                    minImageSrc="/svg/slider-points-min.svg"
                    maxImageSrc="/svg/slider-points-max.svg"
                    min={2}
                    max={30}
                    defaultValue={5}
                    onChange={handleRandomnessChange}
                    isDisabledTrack
                  />
                </div>
                <div className="controls__panel--gif">
                  <Slider
                    min={1}
                    max={60}
                    defaultValue={30}
                    label="FPS"
                    tooltip="Number of frames per second for the output GIF animations."
                    size="small"
                    onChange={handleFpsChange}
                    isShowCurrentValue
                  />
                  <Slider
                    min={100}
                    max={2000}
                    defaultValue={440}
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
                    defaultValue={90}
                    label="Quality"
                    tooltip="Sets the quality of color quantization. Higher values produce better colors, but slow down processing significantly. The default value of 90 provides good color reproduction at a reasonable speed."
                    size="small"
                    onChange={handleQualityChange}
                    isShowCurrentValue
                    valueTransformer={(value) => `${value} %`}
                  />
                </div>
                <div className="controls__panel--buttons">
                  <Button
                    onClick={handleRec}
                    mode="circle"
                  >
                    <img src="/svg/rec.svg" alt="rec" />
                  </Button>
                  <RandomButton onClick={handleRandomClick}>
                    <img src="/svg/dice.svg" alt="dice" />
                  </RandomButton>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
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
  );
};
