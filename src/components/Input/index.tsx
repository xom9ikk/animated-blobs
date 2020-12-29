import { BaseSyntheticEvent, CSSProperties, FC } from 'react';

interface IInput {
  type: string,
  name?: string,
  onChange: (event: BaseSyntheticEvent) => void;
  onFocus?: (event: BaseSyntheticEvent) => void;
  onBlur?: (event: BaseSyntheticEvent) => void;
  value?: string | number,
  style?: CSSProperties,
  min?: number;
  max?: number;
}

export const Input: FC<IInput> = ({
  type,
  name,
  onChange,
  onFocus,
  onBlur,
  value,
  style,
  min,
  max,
  children,
}) => {
  let normalizeValue = value;

  if (min || max) {
    const number = Number(value);
    const isMax = number > max;
    const isMin = number < min;
    if (isMax) {
      normalizeValue = max;
    }
    if (isMin) {
      normalizeValue = min;
    }
  }

  return (
    <div className="input">
      <input
        type={type}
        name={name}
        value={normalizeValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={style}
        min={min}
        max={max}
        className="input__field"
      />
      <div className="input__overlay">
        {children}
      </div>
    </div>
  );
};
