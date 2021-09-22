import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/analytics';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'>
                <text y='.9em' font-size='90'>👨‍💻</text>
                </svg>"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Source+Code+Pro:wght@300;400&display=swap"
            rel="stylesheet"
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', '${GA_TRACKING_ID}');
                       
                       gtag('config', '${GA_TRACKING_ID}', {
                         page_path: window.location.pathname,
                       });
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
