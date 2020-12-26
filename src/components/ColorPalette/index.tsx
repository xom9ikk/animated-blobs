import { FC } from 'react';
import { ColorPaletteItem } from '@components/ColorPaletteItem';
import { IColor } from '@type/entitines';

interface IColorPalette {
  palette: Array<IColor>;
  activeColor: IColor;
  onPickColor: (color: IColor) => void;
  isRemovableColor?: boolean
}

export const ColorPalette: FC<IColorPalette> = ({
  palette,
  activeColor,
  onPickColor,
  isRemovableColor,
}) => (
  <div className="color-palette">
    {
        palette.map((color, index) => (
          <ColorPaletteItem
            key={index}
            color={color}
            isActive={color === activeColor}
            onPickColor={onPickColor}
            isRemovableColor={isRemovableColor}
          />
        ))
      }
  </div>
);
