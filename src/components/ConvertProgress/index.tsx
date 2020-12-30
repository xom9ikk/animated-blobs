import { FC } from 'react';
import { Progress } from '@components/Progress';
import { useSelector } from 'react-redux';
import { getConvertProcess } from '@store/selectors';
import { useUtils } from '@use/utils';

export const ConvertProgress: FC<{ }> = () => {
  const convertProgress = useSelector(getConvertProcess);
  const { convertBlobIdToText } = useUtils();

  return (
    <>
      {
      convertProgress.length > 0 && convertProgress.map((progress) => {
        const operation = progress.progress === 0 ? 'Sending data to workers...' : 'Converting';
        return (
          <Progress
            key={progress.id}
            title={`${operation} ${convertBlobIdToText(progress.id)}`}
            percent={progress.progress}
            remainingText="Please wait for completion"
            // remainingText="12 Seconds remaining"
          />
        );
      })
    }
    </>
  );
};
