import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';

import pkg from '../../package.json';
import { FAVICON_SIZES, GA_TRACKING_ID, HOTJAR_TRACKING_ID } from '../constants';

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
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="Create unique animated GIF or SVG shapes for your creative designs.
            Change colors, make gradients, transparency, set animation duration, FPS, size, delay and quality. (by @xom9ikk)"
          />
          <meta name="keywords" content="blobs, animation, gif, design, tool" />
          <meta name="build version" content={pkg.version} />
          <link rel="icon" href="/icons/icon-48x48.png" />
          {
            FAVICON_SIZES.map((size) => (
              <link
                rel="apple-touch-icon"
                type="image/png"
                sizes={`${size}x${size}`}
                href={`/icons/icon-${size}x${size}.png`}
              />
            ))
           }
          <link rel="manifest" href="/manifest.json" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
          }}
          />
          <script dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${HOTJAR_TRACKING_ID},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
          />
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
