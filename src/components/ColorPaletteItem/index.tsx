import { FC, useMemo, useState } from 'react';
import { useConverter } from '@use/converter';
import { IColor } from '@type/entitines';

interface IColorPaletteItem {
  color?: IColor;
  isActive?: boolean;
  onPickColor: (color: IColor) => void;
  isRemovableColor?: boolean;
  iconSrc?: string;
}

export const ColorPaletteItem: FC<IColorPaletteItem> = ({
  color,
  isActive,
  onPickColor,
  isRemovableColor,
  iconSrc,
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

  const handleColorPick = () => {
    if (isRemovableColor && isActive) {
      handleBlur();
      return onPickColor(null);
    }
    onPickColor(color);
  };

  const focusedRgba = useMemo(() => color && hexToRgb(color, 80), [color]);
  const activeRgba = useMemo(() => color && hexToRgb(color, 30), [color]);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onMouseDownCapture={handleFocus}
      onBlur={handleBlur}
      className={`color-palette-item 
      ${isFocused && !isPressed ? 'color-palette-item--focused' : ''}
      ${isActive && !isFocused ? 'color-palette-item--active' : ''}
      `}
      style={{
        background: color || undefined,
        ['--focused-box-shadow-color' as any]: focusedRgba,
        ['--active-box-shadow-color' as any]: activeRgba,
      }}
      onClick={handleColorPick}
    >
      {iconSrc && <img src={iconSrc} alt="icon" />}
    </button>
  );
};
