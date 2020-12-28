import {
  BaseSyntheticEvent, FC, useEffect, useState,
} from 'react';
import { Slider } from '@components/Slider';
import { useUtils } from '@use/utils';
import { ColorPicker } from '@components/ColorPicker';
import { Button } from '@components/Button';
import { RandomButton } from '@components/RandomButton';
import { useDispatch, useSelector } from 'react-redux';
import { SystemActions } from '@store/actions';
import { IColor } from '@type/entitines';
import {
  getActiveBlobId,
  getColors, getSvg,
} from '@store/selectors';
import { useThrottle } from '@use/throttle';
import { useDownload } from '@use/download';
import { Modal } from '@components/Modal';
import { CodePreview } from '@components/CodePreview';
import { Tabs } from '@components/Tabs';

export const Controls: FC<{}> = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeBlobId = useSelector(getActiveBlobId);
  const currentColors = useSelector(getColors(activeBlobId));
  const svg = useSelector(getSvg);

  const { getRandomInt } = useUtils();
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
    handleRandomClick();
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

  const handleCopy = () => {
    setIsCopied(true);
  };

  const handleCloseModel = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const backgroundSrc = `/svg/wave-${getRandomInt(0, 6)}.svg`;

  return (
    <div className="controls">
      <div
        className="controls__wrapper"
        style={{
          backgroundImage: `url("${backgroundSrc}")`,
        }}
      >
        <div className="controls__panel">
          <Tabs
            items={[
              {
                name: 'SVG static',
                route: 'svg',
                render: () => (<></>),
              },
              {
                name: 'GIF animation',
                route: 'gif',
                render: () => (
                  <div className="controls__panel--gif">
                    <Slider
                      min={1}
                      max={60}
                      defaultValue={30}
                      label="FPS"
                      size="small"
                      onChange={handleFpsChange}
                      isShowCurrentValue
                    />
                    <Slider
                      min={1}
                      max={100}
                      defaultValue={70}
                      label="Quality"
                      size="small"
                      onChange={handleQualityChange}
                      isShowCurrentValue
                      valueTransformer={(value) => `${value} %`}
                    />
                    <Slider
                      min={100}
                      max={2000}
                      defaultValue={440}
                      label="Size"
                      size="small"
                      onChange={handleSizeChange}
                      isShowCurrentValue
                      valueTransformer={(value) => `${value}px`}
                    />
                    <Slider
                      min={1}
                      max={100}
                      defaultValue={100}
                      label="Opacity"
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
                      size="small"
                      onChange={handleDelayChange}
                      isShowCurrentValue
                      valueTransformer={(value) => `${(value / 1000).toFixed(2)} s`}
                    />
                  </div>
                ),
              },
            ]}
          />
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
            <RandomButton
              onClick={handleRandomClick}
            >
              <img src="/svg/dice.svg" alt="dice" />
            </RandomButton>
          </div>
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
