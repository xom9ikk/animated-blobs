export const useConverter = () => {
  const hexToRgb = (hex: string, alpha?: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(b)) return null;

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  return {
    hexToRgb,
  };
};
