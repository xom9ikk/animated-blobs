import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';

import pkg from '../../package.json';

const faviconSizes = [48, 72, 96, 144, 192, 256, 384, 512];

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Animated Blobs - Create cool animated GIF or SVG shapes for your designs" />
          <meta name="build version" content={pkg.version} />
          {
            faviconSizes.map((size) => (
              <link
                rel="shortcut icon"
                type="image/png"
                sizes={`${size}x${size}`}
                href={`/icons/icon-${size}x${size}.png`}
              />
            ))
           }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
