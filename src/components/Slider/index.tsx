import { FC, useEffect, useState } from 'react';
import SliderComponent from 'rc-slider';

interface ISlider {
  minImageSrc?: string;
  maxImageSrc?: string;
  min: number;
  max: number;
  defaultValue?: number;
  onChange: (value: number)=>void;
  label?: string;
  tooltip?: string;
  size?: 'small' | 'large';
  isShowCurrentValue?: boolean;
  valueTransformer?: (value: number) => string | number;
  isDisabledTrack?: boolean;
}

export const Slider: FC<ISlider> = ({
  minImageSrc,
  maxImageSrc,
  min,
  max,
  defaultValue,
  onChange,
  label,
  tooltip,
  size = 'large',
  isShowCurrentValue,
  valueTransformer,
  isDisabledTrack,
}) => {
  const [value, setValue] = useState<number>(defaultValue || 0);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={`slider slider--${size} ${isDisabledTrack ? 'slider--disable-track' : ''}`}>
      { label && (
        <label className="slider__label">
          {label}
          <img
            className="slider__info"
            src="/svg/info.svg"
            alt="info"
            data-for="tooltip"
            data-tip={tooltip}
          />
        </label>
      )}
      { minImageSrc && <img className="slider__image" src={minImageSrc} alt="min" />}
      <SliderComponent
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={setValue}
      />
      { isShowCurrentValue ? (
        <span className="slider__label">
          {valueTransformer ? valueTransformer(value) : value}
        </span>
      ) : null}
      { maxImageSrc && <img className="slider__image" src={maxImageSrc} alt="max" />}
    </div>
  );
};
