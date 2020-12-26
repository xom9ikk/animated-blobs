import { BaseSyntheticEvent, FC } from 'react';

interface IButton {
  onClick: (e: BaseSyntheticEvent) => void
}

export const Button: FC<IButton> = ({
  onClick,
  children,
}) => (
  <button className="button button--circle" onClick={onClick}>
    <div className="button__inner">
      {children}
    </div>
  </button>
);
