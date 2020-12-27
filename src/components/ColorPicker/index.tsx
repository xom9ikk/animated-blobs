import {
  BaseSyntheticEvent, FC, useRef, useState,
} from 'react';
import { Input } from '@components/Input';
import { ColorPalette } from '@components/ColorPalette';
import { useHexValidator } from '@use/hex-validator';
import { useOutsideHandler } from '@use/outsideHandler';
import { IColor } from '@type/entitines';

const palette = [
  '#8A3FFC',
  '#FF0066',
  '#FA4D56',
  '#F1C21B',
  '#08BDBA',
  '#0F62FE',
  '#24A148',
  '#A7F0BA',
  '#9EF0F0',
  '#BAE6FF',
  '#D0E2FF',
  '#E8DAFF',
  '#FFD6E8',
  '#F2F4F8',
];

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

  return (
    <div
      ref={ref}
      className="color-picker"
    >
      <Input
        type="text"
        value={currentColor || ''}
        onChange={handleColorChange}
        onFocus={handleFocus}
      >
        <div
          className="color-picker__pointer"
          style={{
            background: currentColor || undefined,
            opacity: isValidColor ? 1 : 0.5,
          }}
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
