import { BaseSyntheticEvent, CSSProperties, FC } from 'react';

interface IInput {
  type: string,
  name?: string,
  // width?: string,
  // touched?: boolean,
  // error?: string,
  onChange: (event: BaseSyntheticEvent) => void;
  onFocus?: (event: BaseSyntheticEvent) => void;
  onBlur?: (event: BaseSyntheticEvent) => void;
  // onKeyDown?: (event:any) => void;
  value?: string | number,
  // placeholder?: string,
  // label?: string,
  style?: CSSProperties,
  min: number;
  max: number;
  // isLight?: boolean,
  // isDisable?: boolean,
  // children?: any,
}

export const Input: FC<IInput> = ({
  type,
  name,
  // width,
  // touched,
  // error,
  onChange,
  onFocus,
  onBlur,
  // onKeyDown,
  value,
  // placeholder,
  // label,
  style,
  min,
  max,
  // isLight,
  // isDisable,
  children,
  // ...attrs
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
