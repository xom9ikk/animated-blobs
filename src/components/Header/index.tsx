import { FC } from 'react';
import Link from 'next/link';
import { Blob } from '@components/Blob';

const LOGO_BLOB_SIZE = 250;

export const Header: FC<{}> = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__inner">
        <Link href="/">
          <a>
            <Blob
              id="logo-blob"
              width={LOGO_BLOB_SIZE}
              height={LOGO_BLOB_SIZE}
              colors={['#8A3FFC', '#8332FC']}
              isLoop
              duration={5000}
              blobOptions={{
                size: LOGO_BLOB_SIZE,
                extraPoints: 3,
                randomness: 3,
              }}
            />
            <img
              className="header__logo"
              src="/images/logo.png"
              alt="logo"
            />
          </a>
        </Link>
        <span className="header__text">
          by
          <a
            className="header__link"
            href="https://github.com/xom9ikk"
            rel="noreferrer"
            target="_blank"
          >
            @xom9ikk
          </a>
        </span>
      </div>
    </div>
  </header>
);
