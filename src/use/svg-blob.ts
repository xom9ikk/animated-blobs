import { IColors } from '@type/entitines';

export const useSvgBlob = () => {
  const generateSvg = (
    path: string,
    width: number,
    height: number,
    colors: IColors,
  ) => {
    const isGradient = colors[1] !== null;

    return `
<svg width="${width}" height="${height}">
  ${isGradient ? `<defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${colors[0]}" stop-opacity="${1}" />
      <stop offset="100%" stop-color="${colors[1]}" stop-opacity="${1}" />
    </linearGradient>
  </defs>` : ''} 
  <path d="${path}" fill="${isGradient ? 'url(#gradient)' : (colors[0] || undefined)}" />
</svg>`;
  };

  return {
    generateSvg,
  };
};
