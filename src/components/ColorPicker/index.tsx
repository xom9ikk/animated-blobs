import { BaseSyntheticEvent, FC, useState } from 'react';
import { Input } from '@components/Input';
import { useHexValidator } from '@use/hex-validator';
import { ColorPalette } from '@components/ColorPalette';

const palette = [
  '#FF0066',
  '#8A3FFC',
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

export const ColorPicker: FC<{}> = () => {
  const [currentColor, setCurrentColor] = useState<string>('#FF3344');
  const [isValidColor, setIsValidColor] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { isPotentiallyValid, isValid } = useHexValidator();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleColorChange = (e: BaseSyntheticEvent) => {
    const newValue = e.target.value.toUpperCase();
    if (!isPotentiallyValid(newValue)) {
      return;
    }
    setIsValidColor(isValid(newValue));
    setCurrentColor(newValue);
  };

  const handlePickColor = (color: string) => {
    setCurrentColor(color);
  };

  return (
    <div className="color-picker">
      <Input
        type="text"
        value={currentColor}
        onChange={handleColorChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div
          className="color-picker__pointer"
          style={{
            background: currentColor,
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
          />
        )
      }
    </div>
  );
};
