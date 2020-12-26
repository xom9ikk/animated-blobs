import { BaseSyntheticEvent, FC, useState } from 'react';

interface IRandomButton {
  onClick: (e: BaseSyntheticEvent) => void
}

export const RandomButton: FC<IRandomButton> = ({
  onClick,
  children,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      className={`random-button ${isPressed ? 'random-button--pressed' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
    >
      <div className="random-button__inner">
        {children}
      </div>
    </button>
  );
};
