import React from 'react';
import Link from 'next/link';

interface ITab {
  active: boolean;
  item: {
    name: string;
    route: string;
  }
  animating: boolean;
  startAnimating: () => void;
}

const TabComponent = ({
  active, item, animating, startAnimating,
}: ITab, ref: React.Ref<any>) => (
  <li className="tab" key={`tab-${item.route}`}>
    <Link
      href={item.route}
    >
      <a
        className={`tab__inner ${active ? 'active' : 'inactive'} ${animating ? 'animating' : ''}`}
        ref={ref}
        onClick={startAnimating}
      >
        {item.name}
      </a>
    </Link>
  </li>
);

export const Tab = React.forwardRef(TabComponent);
