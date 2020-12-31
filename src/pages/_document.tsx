import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';

import pkg from '../../package.json';
import { GA_TRACKING_ID, HOTJAR_TRACKING_ID } from '../constants';

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
          <meta name="theme-color" content="#ffffff" />
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
