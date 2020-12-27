import { BaseSyntheticEvent, CSSProperties, FC } from 'react';

interface IButton {
  isPrimary?: boolean;
  mode?: 'rect' | 'circle';
  onClick?: (e: BaseSyntheticEvent) => void;
  style?: CSSProperties;
}

export const Button: FC<IButton> = ({
  isPrimary,
  mode = 'rect',
  onClick,
  style,
  children,
}) => (
  <button
    className={`button button--${mode} ${isPrimary ? 'button--primary' : ''}`}
    onClick={onClick}
  >
    <div
      className="button__inner"
      style={style}
    >
      {children}
    </div>
  </button>
);
