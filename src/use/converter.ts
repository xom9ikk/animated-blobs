export const useConverter = () => {
  const hexToRgb = (hex: string, alpha?: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const color = alpha
      ? `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
      : `rgb(${r}, ${g}, ${b})`;

    if (color.includes('NaN')) return null;

    return color;
  };

  return {
    hexToRgb,
  };
};
