import { FC, useState } from 'react';
import { useConverter } from '@use/converter';

interface IColorPalette {
  palette: Array<string>;
  activeColor: string;
  onPickColor: (color: string) => void;
}

export const ColorPalette: FC<IColorPalette> = ({
  palette,
  activeColor,
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

  return (
    <div className="color-palette">
      {
          palette.map((color) => {
            const isActive = color === activeColor;
            const initialAlpha = 0.8;
            const rgba = hexToRgb(color, initialAlpha);
            const boxShadow = isActive && isFocused && !isPressed ? `${rgba} 0 0 0 2px, ${rgba} 0 0 0 2px` : '';
            return (
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`color-palette__item ${isActive && !isFocused ? 'color-palette__item--active' : ''} `}
                style={{
                  background: color,
                  boxShadow,
                  // @ts-ignore
                  '--box-shadow-color': rgba.replace(initialAlpha, 0.3),
                }}
                onClick={() => onPickColor(color)}
              />
            );
          })
        }
    </div>
  );
};
