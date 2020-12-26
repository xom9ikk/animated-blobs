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
  value?: string,
  // placeholder?: string,
  // label?: string,
  style?: CSSProperties,
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
  // isLight,
  // isDisable,
  children,
  // ...attrs
}) => (
  <div className="input">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      className="input__field"
    />
    <div className="input__overlay">
      {children}
    </div>
  </div>
);
