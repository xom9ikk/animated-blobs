/* eslint-disable no-undef */
import {
  BaseSyntheticEvent, FC, useRef,
} from 'react';
import usePortal from 'react-useportal/dist/usePortal';
import { Button } from '@components/Button';
import { useEventListener } from '@use/event-listener';
import { useOutsideHandler } from '@use/outside-handler';

interface IModal {
  isOpen: boolean,
  title: string,
  isSoftExit?: boolean,
  negative?: string,
  positive: string,
  onPositive: (e: BaseSyntheticEvent) => void,
  onNegative?: (e: BaseSyntheticEvent) => void,
  onClose: (e: BaseSyntheticEvent | KeyboardEvent) => void,
  size?: string,
}

export const Modal: FC<IModal> = ({
  isOpen,
  title,
  isSoftExit = true,
  negative,
  positive,
  onPositive,
  onNegative,
  onClose,
  children,
}) => {
  const ref = useRef<any>();

  const { Portal } = usePortal();

  useEventListener('keydown', onClose, 'Escape');

  const outsideClickHandler = (e: BaseSyntheticEvent) => {
    if (isSoftExit) onClose(e);
  };

  useOutsideHandler(ref, outsideClickHandler);

  const classes = ['modal'];

  if (isOpen) {
    classes.push('modal--opened');
  }

  return (
    <Portal>
      <div className={classes.join(' ')}>
        <div
          ref={ref}
          className="modal__wrapper"
        >
          <div className="modal__header">
            <span className="modal__title">{title}</span>
            <Button
              onClick={onClose}
              mode="circle"
              style={{
                borderColor: 'transparent',
                backgroundImage: 'url("/svg/close.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                position: 'absolute',
                top: 8,
                right: 12,
              }}
            />
          </div>
          <div className="modal__body">
            {children}
            <div className="modal__prompt">
              {
                negative && (
                <Button onClick={onNegative}>
                  {negative}
                </Button>
                )
              }
              <Button onClick={onPositive} isPrimary>
                {positive}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
