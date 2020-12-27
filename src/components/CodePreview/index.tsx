import { FC } from 'react';

interface ICodePreview {
}

export const CodePreview: FC<ICodePreview> = ({
  children,
}) => (
  <div className="code-preview">
    <div className="code-preview__inner">
      <pre>
        {children}
      </pre>
    </div>
  </div>
);
