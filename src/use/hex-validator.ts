export const useHexValidator = () => {
  const isPotentiallyValid = (hex: string) => {
    const patternPotentialValid = new RegExp(/^#[0-9A-F]{0,6}$/i);
    return patternPotentialValid.test(hex);
  };

  const isValid = (hex: string) => {
    const patternPotentialValid = new RegExp(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i);
    return patternPotentialValid.test(hex);
  };

  return {
    isValid,
    isPotentiallyValid,
  };
};
