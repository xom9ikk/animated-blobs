import { FC } from 'react';
import { Slider } from '@components/Slider';
import { useUtils } from '@use/utils';

export const Controls: FC<{}> = () => {
  const { getRandomInt } = useUtils();

  const backgroundSrc = `/svg/wave-${getRandomInt(0, 6)}.svg`;

  return (
    <div className="controls">
      <div className="controls__wrapper">
        <div className="controls-panel">
          <Slider
            minImageSrc="/svg/slider-randomness-min.svg"
            maxImageSrc="/svg/slider-randomness-max.svg"
          />
          <Slider
            minImageSrc="/svg/slider-points-min.svg"
            maxImageSrc="/svg/slider-points-max.svg"
          />
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
