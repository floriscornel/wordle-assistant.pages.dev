import { Html, Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Document() {
  return (
    <Html lang='en' className='bg-neutral-900 text-white'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
