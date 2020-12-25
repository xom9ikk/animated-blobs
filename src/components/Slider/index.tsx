import { FC } from 'react';
import SliderComponent from 'rc-slider';

interface ISlider {
  minImageSrc: string;
  maxImageSrc: string;
}

export const Slider: FC<ISlider> = ({
  minImageSrc,
  maxImageSrc,
}) => (
  <div className="slider">
    <img src={minImageSrc} alt="min" />
    <SliderComponent />
    <img src={maxImageSrc} alt="min" />
  </div>
);
