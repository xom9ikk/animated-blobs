import { FC } from 'react';

export const BlobPreview : FC<{}> = ({ children }) => (
  <div className="blob-preview">
    <div className="blob-preview__wrapper">
      <div className="blob-preview__inner">{children}</div>
    </div>
  </div>
);
