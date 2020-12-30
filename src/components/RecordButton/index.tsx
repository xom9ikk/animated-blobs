import {
  FC, useEffect, useRef,
} from 'react';
import { SystemActions } from '@store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getConvertProcess, getIsRec } from '@store/selectors';
import { MAX_REC_MS_TIME } from '../../constants';

export const RecordButton: FC<{}> = () => {
  const dispatch = useDispatch();

  const startTimeRef = useRef<number>();
  const isRecRef = useRef<boolean>();
  const interval = useRef<any>();

  const isRec = useSelector(getIsRec);
  const convertProcess = useSelector(getConvertProcess);
  const isConverting = convertProcess.length > 0;

  const handleChange = () => {
    if (isConverting) return;
    if (!isRec) {
      startTimeRef.current = new Date().getTime();

      interval.current = setInterval(() => {
        const currentTime = new Date().getTime();
        if (currentTime > startTimeRef.current + MAX_REC_MS_TIME && isRecRef.current) {
          dispatch(SystemActions.switchIsRec());
          clearInterval(interval.current);
        }
      }, 300);
    } else if (isRec) {
      clearInterval(interval.current);
    }

    dispatch(SystemActions.switchIsRec());
  };

  useEffect(() => () => {
    clearInterval(interval.current);
  }, []);

  useEffect(() => {
    isRecRef.current = isRec;
  }, [isRec]);

  return (
    <div className="record-button__wrapper">
      <img
        className="slider__info"
        src="/svg/info.svg"
        alt="info"
        data-for="tooltip"
        data-tip="Max recording time is 15 seconds to avoid too long processing."
      />
      <div className="record-button__inner">
        <button className="record-button" disabled={isConverting}>
          <input
            type="checkbox"
            id="btn"
            onChange={handleChange}
            checked={isRec}
          />
          <label htmlFor="btn" />
          <div className="time">
            <div className="s_ms" />
          </div>
        </button>
      </div>
    </div>
  );
};
