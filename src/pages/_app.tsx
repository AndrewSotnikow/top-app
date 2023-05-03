import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import '../styles/globals.css'
import Head from 'next/head'
import ym, { YMInitializer } from 'react-yandex-metrika'
import Router from 'next/router'

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps, router }: AppProps) {
  Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
      ym('hit', url)
    }
  })

  return (
    <main className={notoSans.className}>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='preconnect' href='https://mc.yandex.ru' />
        <meta
          property='og:url'
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version='2'
      />
      <Component {...pageProps} />
    </main>
  )
}
