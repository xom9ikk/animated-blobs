import downloadjs from 'downloadjs';

export const useDownload = () => {
  const download = (link: string) => downloadjs(link);

  const downloadText = (text: string, name: string, type: string) => {
    const a = document.createElement('a');
    const file = new Blob([text], { type });
    a.href = URL.createObjectURL(file);
    a.download = `${name}.${type}`;
    a.click();
    a.remove();
  };

  return {
    download,
    downloadText,
  };
};
