import { FC } from 'react';

export const Button: FC<{}> = ({
  children,
}) => (
  <button className="button button--circle">
    <div className="button__inner">
      {children}
    </div>
  </button>
);
