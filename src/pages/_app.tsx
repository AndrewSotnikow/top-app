import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import '../styles/globals.css'
import Head from 'next/head'

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={notoSans.className}>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <meta
          property='og:url'
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <Component {...pageProps} />
    </main>
  )
}
