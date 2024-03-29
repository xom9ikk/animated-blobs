export const useDownload = () => {
  const downloadBlobParts = (data: Uint8Array | string, name: string, type: string) => {
    const a = document.createElement('a');
    const file = new Blob([data], { type });
    a.href = URL.createObjectURL(file);
    a.download = `${name}.${type}`;
    a.click();
    a.remove();
  };

  return {
    downloadBlobParts,
  };
};
