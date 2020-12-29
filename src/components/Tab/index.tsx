import {
  CSSProperties, forwardRef, ReactNode, Ref,
} from 'react';

interface ITab {
  id: string;
  text: string;
  animating?: boolean;
  startAnimating?: () => void;
  isActive?: boolean;
  onClick?: (id: string, isDisabled?: boolean) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: ReactNode;
  isRemovable?: boolean;
  onRemove?: (id: string) => void;
  isDisabled?: boolean;
  style?: CSSProperties;
}

const TabComponent = ({
  id,
  text,
  animating,
  startAnimating,
  isActive,
  onClick,
  isRemovable,
  onRemove,
  isDisabled,
  style,
}: ITab, ref: Ref<HTMLLIElement>) => (
  <li
    className="tab"
    key={`tab-${id}`}
    onClick={() => onClick(id, isDisabled)}
  >
    <div
      className={`tab__inner tab__inner--${isActive ? 'active' : 'inactive'}
       ${animating ? 'tab__inner--animating' : ''}
      `}
      ref={ref}
      onClick={startAnimating}
      style={style}
    >
      {text}
      {isRemovable && (
        <button
          className="tab__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
        />
      )}
    </div>
  </li>
);

export const Tab = forwardRef(TabComponent);
