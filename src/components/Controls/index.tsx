import { FC, useEffect, useState } from 'react';
import { Slider } from '@components/Slider';
import { useUtils } from '@use/utils';
import { ColorPicker } from '@components/ColorPicker';
import { Button } from '@components/Button';
import { RandomButton } from '@components/RandomButton';
import { useDispatch, useSelector } from 'react-redux';
import { SystemActions } from '@store/actions';
import { IColor } from '@type/entitines';
import { getColors, getSvg } from '@store/selectors';
import { useThrottle } from '@use/throttle';
import { useDownload } from '@use/download';
import { Modal } from '@components/Modal';
import { CodePreview } from '@components/CodePreview';
import { Tabs } from '@components/Tabs';

export const Controls: FC<{}> = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const currentColors = useSelector(getColors);
  const svg = useSelector(getSvg);

  const { getRandomInt } = useUtils();
  const { downloadText } = useDownload();

  const handleRandomClick = useThrottle(() => {
    dispatch(SystemActions.setSeed(Math.random()));
  }, 250);

  const handleFirstColorPick = (color: IColor) => {
    dispatch(SystemActions.setColor({
      color,
      index: 0,
    }));
  };

  const handleSecondColorPick = (color: IColor) => {
    dispatch(SystemActions.setColor({
      color,
      index: 1,
    }));
  };

  const handleRandomnessChange = useThrottle((randomness: number) => {
    dispatch(SystemActions.setRandomness(randomness));
    handleRandomClick();
  }, 250);

  const handleExtraPointsChange = (extraPoints: number) => {
    dispatch(SystemActions.setExtraPoints(extraPoints));
  };

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
              // @ts-ignore
            items={[
              {
                name: 'SVG static',
                route: 'svg',
                render: () => (
                  <p>
                    1
                  </p>
                ),
              },
              {
                name: 'GIF animation',
                route: 'gif',
                render: () => (
                  <p>
                    2
                  </p>
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
              onChange={handleExtraPointsChange}
            />
            <Slider
              minImageSrc="/svg/slider-points-min.svg"
              maxImageSrc="/svg/slider-points-max.svg"
              min={2}
              max={30}
              onChange={handleRandomnessChange}
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
