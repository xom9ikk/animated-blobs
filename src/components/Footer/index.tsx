import { FC } from 'react';

export const Footer: FC<{}> = () => (
  <footer className="footer">
    <img src="/svg/footer-wave.svg" alt="wave" />
    <div className="footer__inner">
      © 2020 by
      {' '}
      <a href="https://github.com/xom9ikk">@xom9ik</a>
    </div>
  </footer>
);
