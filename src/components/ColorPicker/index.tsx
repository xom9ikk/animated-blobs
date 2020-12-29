import {
  BaseSyntheticEvent, FC, useRef, useState,
} from 'react';
import { Input } from '@components/Input';
import { ColorPalette } from '@components/ColorPalette';
import { useHexValidator } from '@use/hex-validator';
import { useOutsideHandler } from '@use/outsideHandler';
import { IColor } from '@type/entitines';
import { useEventListener } from '@use/event-listener';
import { palette } from '../../constants';

interface IColorPicker {
  currentColor: IColor;
  onColorPick: (color: IColor) => void;
  isRemovableColor?: boolean;
}

export const ColorPicker: FC<IColorPicker> = ({
  currentColor,
  onColorPick,
  isRemovableColor,
}) => {
  const ref = useRef<HTMLDivElement>();

  const [isValidColor, setIsValidColor] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { isPotentiallyValid, isValid } = useHexValidator();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const outsideClickHandler = () => {
    setIsFocused(false);
  };

  useOutsideHandler(ref, outsideClickHandler);
  useEventListener('keydown', outsideClickHandler, 'Escape');

  const handleColorChange = (e: BaseSyntheticEvent) => {
    const newValue = e.target.value.toUpperCase();
    if (!isPotentiallyValid(newValue)) {
      return;
    }
    setIsValidColor(isValid(newValue));
    onColorPick(newValue);
  };

  const handlePickColor = (color: IColor) => {
    onColorPick(color);
  };

  const background = currentColor || undefined;
  const backgroundImage = !currentColor ? 'url("/svg/transparency.svg")' : undefined;
  const opacity = isValidColor ? 1 : 0.5;
  const style = background ? {
    opacity,
    background,
  } : {
    opacity,
    backgroundImage,
  };

  return (
    <div
      ref={ref}
      className="color-picker"
      onClick={handleFocus}
    >
      <Input
        type="text"
        value={currentColor || ''}
        onChange={handleColorChange}
        onFocus={handleFocus}
      >
        <div
          className="color-picker__pointer"
          style={style}
        />
      </Input>
      {
        isFocused && (
          <ColorPalette
            palette={palette}
            activeColor={currentColor}
            onPickColor={handlePickColor}
            isRemovableColor={isRemovableColor}
          />
        )
      }
    </div>
  );
};
