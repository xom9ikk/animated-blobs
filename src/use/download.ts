import downloadjs from 'downloadjs';

export const useDownload = () => {
  const download = (link: string) => downloadjs(link);

  const downloadBlobParts = (data: Uint8Array, name: string, type: string) => {
    const a = document.createElement('a');
    const file = new Blob([data], { type });
    a.href = URL.createObjectURL(file);
    a.download = `${name}.${type}`;
    a.click();
    a.remove();
  };

  return {
    download,
    downloadBlobParts,
  };
};
