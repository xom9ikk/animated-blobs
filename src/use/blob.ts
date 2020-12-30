import { IColors } from '@type/entitines';
import { useConverter } from '@use/converter';

export const useBlob = () => {
  const { hexToRgb } = useConverter();

  const setColors = (
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    colors: IColors,
    opacity: number,
    height: number,
  ) => {
    let gradient;
    if (colors[0] !== null && colors[1] !== null) {
      const fromRgba = hexToRgb(colors[0], opacity);
      const toRgba = hexToRgb(colors[1], opacity) || fromRgba;
      gradient = ctx.createLinearGradient(0, 0, height, 0);
      gradient.addColorStop(0, fromRgba);
      gradient.addColorStop(1, toRgba);
      ctx.fillStyle = gradient;
    } else if (colors[0] !== null) {
      ctx.fillStyle = hexToRgb(colors[0], opacity);
    }
  };

  return {
    setColors,
  };
};
