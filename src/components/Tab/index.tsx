import { forwardRef, ReactNode, Ref } from 'react';

interface ITab {
  id: string;
  text: string;
  animating?: boolean;
  startAnimating?: () => void;
  isActive?: boolean;
  onClick?: (id: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: ReactNode;
}

const TabComponent = ({
  id,
  text,
  animating,
  startAnimating,
  isActive,
  onClick,
}: ITab, ref: Ref<HTMLLIElement>) => (
  <li className="tab" key={`tab-${id}`} onClick={() => onClick(id)}>
    <span
      className={`tab__inner tab__inner--${isActive ? 'active' : 'inactive'} ${animating ? 'tab__inner--animating' : ''}`}
      ref={ref}
      onClick={startAnimating}
    >
      {text}
    </span>
  </li>
);

export const Tab = forwardRef(TabComponent);
