import { FC } from 'react';
import { ColorPaletteItem } from '@components/ColorPaletteItem';
import { IColor } from '@type/entitines';
import { useGenerate } from '@use/generate';

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
}) => {
  const { hex } = useGenerate();

  const handlePickRandomColor = () => {
    onPickColor(hex());
  };

  return (
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
      <ColorPaletteItem
        key="random-color"
        color="#333333"
        onPickColor={handlePickRandomColor}
        isRemovableColor={isRemovableColor}
        iconSrc="/svg/dice.svg"
      />
    </div>
  );
};
