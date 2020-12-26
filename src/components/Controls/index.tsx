import { FC } from 'react';
import { Slider } from '@components/Slider';
import { useUtils } from '@use/utils';
import { ColorPicker } from '@components/ColorPicker';
import { Button } from '@components/Button';
import { RandomButton } from '@components/RandomButton';

export const Controls: FC<{}> = () => {
  const { getRandomInt } = useUtils();

  const backgroundSrc = `/svg/wave-${getRandomInt(0, 6)}.svg`;

  const handleRandomCLick = () => {

  };

  return (
    <div className="controls">
      <div className="controls__wrapper">
        <div className="controls-panel">
          <ColorPicker />
          <Slider
            minImageSrc="/svg/slider-randomness-min.svg"
            maxImageSrc="/svg/slider-randomness-max.svg"
          />
          <Slider
            minImageSrc="/svg/slider-points-min.svg"
            maxImageSrc="/svg/slider-points-max.svg"
          />
          <Button><img src="/svg/download.svg" alt="download" /></Button>
          <Button><img src="/svg/code.svg" alt="code" /></Button>
          <RandomButton
            onClick={handleRandomCLick}
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
