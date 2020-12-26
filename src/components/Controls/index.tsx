import { FC } from 'react';
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

const { getRandomInt } = useUtils();

const backgroundSrc = `/svg/wave-${getRandomInt(0, 6)}.svg`;

export const Controls: FC<{}> = () => {
  const dispatch = useDispatch();
  const currentColors = useSelector(getColors);
  const svg = useSelector(getSvg);

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
    // handleRandomClick();
  };

  const handleDownload = () => {
    downloadText(svg, 'svg-blob', 'svg');
  };

  const handleShowCode = () => {
    console.log(svg);
  };

  return (
    <div className="controls">
      <div className="controls__wrapper">
        <div className="controls__panel">
          <ColorPicker
            currentColor={currentColors[0]}
            onColorPick={handleFirstColorPick}
          />
          <ColorPicker
            currentColor={currentColors[1]}
            onColorPick={handleSecondColorPick}
            isRemovableColor
          />
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
          <Button
            onClick={handleDownload}
          >
            <img src="/svg/download.svg" alt="download" />
          </Button>
          <Button
            onClick={handleShowCode}
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
      <img
        className="controls__background"
        src={backgroundSrc}
        alt="wave"
      />
    </div>
  );
};
