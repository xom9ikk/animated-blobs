import { FC } from 'react';

interface IProgress {
  title: string;
  percent: number;
  remainingText?: string;
}

export const Progress: FC<IProgress> = ({
  title,
  percent,
  remainingText,
}) => (
  <div className="progress">
    <div className="progress__inner">
      <span className="progress__title">
        {title}
      </span>
      <span className="progress__subtitle">
        {percent}
        {' '}
        %
        {
          remainingText && (
          <>
            {' '}
            <div className="progress__divider" />
            {' '}
            {remainingText}
          </>
          )
        }
      </span>
      <div className="progress__progress">
        <div className="progress__progress-skeleton" />
        <div className="progress__progress-filler" style={{ width: `${percent}%` }} />
      </div>
    </div>
  </div>
);
