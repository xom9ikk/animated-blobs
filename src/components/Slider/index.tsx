import { FC } from 'react';
import SliderComponent from 'rc-slider';

interface ISlider {
  minImageSrc: string;
  maxImageSrc: string;
  min: number;
  max: number;
  onChange: (value: number)=>void;
}

export const Slider: FC<ISlider> = ({
  minImageSrc,
  maxImageSrc,
  min,
  max,
  onChange,
}) => (
  <div className="slider">
    <img src={minImageSrc} alt="min" />
    <SliderComponent
      min={min}
      max={max}
      onChange={onChange}
    />
    <img src={maxImageSrc} alt="min" />
  </div>
);
