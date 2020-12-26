import { FC } from 'react';
import { ColorPaletteItem } from '@components/ColorPaletteItem';

interface IColorPalette {
  palette: Array<string>;
  activeColor: string;
  onPickColor: (color: string) => void;
}

export const ColorPalette: FC<IColorPalette> = ({
  palette,
  activeColor,
  onPickColor,
}) => (
  <div className="color-palette">
    {
      palette.map((color) => (
        <ColorPaletteItem
          color={color}
          isActive={color === activeColor}
          onPickColor={onPickColor}
        />
      ))
    }
  </div>
);
