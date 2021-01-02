import { FC } from 'react';

export const Footer: FC<{}> = () => (
  <footer className="footer">
    <img src="/svg/footer-wave.svg" alt="wave" />
    <div className="footer__inner">
      © 2021 by
      {' '}
      <a href="https://github.com/xom9ikk">@xom9ikk</a>
    </div>
  </footer>
);
