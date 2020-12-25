export const useUtils = () => {
  const getRandomInt = (min: number, max: number) => Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)
    ) + Math.ceil(min),
  );

  return {
    getRandomInt,
  };
};
