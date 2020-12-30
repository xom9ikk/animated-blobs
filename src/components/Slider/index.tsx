import { FC, useEffect, useState } from 'react';
import SliderComponent from 'rc-slider';

interface ISlider {
  minImageSrc?: string;
  maxImageSrc?: string;
  min: number;
  max: number;
  value?: number;
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
  value,
  onChange,
  label,
  tooltip,
  size = 'large',
  isShowCurrentValue,
  valueTransformer,
  isDisabledTrack,
}) => {
  const [internalValue, setInternalValue] = useState<number>(value || 0);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`slider slider--${size} ${isDisabledTrack ? 'slider--disable-track' : ''}`}>
      { label && (
        <span className="slider__label">
          {label}
          <img
            className="slider__info"
            src="/svg/info.svg"
            alt="info"
            data-for="tooltip"
            data-tip={tooltip}
          />
        </span>
      )}
      { minImageSrc && <img className="slider__image" src={minImageSrc} alt="min" />}
      <SliderComponent
        min={min}
        max={max}
        value={internalValue}
        onChange={handleChange}
      />
      { isShowCurrentValue ? (
        <span className="slider__label">
          {valueTransformer ? valueTransformer(internalValue) : internalValue}
        </span>
      ) : null}
      { maxImageSrc && <img className="slider__image" src={maxImageSrc} alt="max" />}
    </div>
  );
};
