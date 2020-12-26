import { FC, useMemo, useState } from 'react';
import { useConverter } from '@use/converter';

interface IColorPaletteItem {
  color: string;
  isActive: boolean;
  onPickColor: (color: string) => void;
}

export const ColorPaletteItem: FC<IColorPaletteItem> = ({
  color,
  isActive,
  onPickColor,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { hexToRgb } = useConverter();

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const focusedRgba = useMemo(() => hexToRgb(color, 0.8), [color]);
  const activeRgba = useMemo(() => hexToRgb(color, 0.3), [color]);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`color-palette-item 
      ${isFocused && !isPressed ? 'color-palette-item--focused' : ''}
      ${isActive && !isFocused ? 'color-palette-item--active' : ''}
      `}
      style={{
        background: color,
        ['--focused-box-shadow-color' as any]: focusedRgba,
        ['--active-box-shadow-color' as any]: activeRgba,
      }}
      onClick={() => onPickColor(color)}
    />
  );
};
