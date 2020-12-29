export const useUtils = () => {
  const getRandomInt = (min: number, max: number) => Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)
    ) + Math.ceil(min),
  );

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const convertBlobIdToText = (
    id: string,
  ) => capitalizeFirstLetter(id.replace('-', ' #'));

  return {
    getRandomInt,
    capitalizeFirstLetter,
    convertBlobIdToText,
  };
};
