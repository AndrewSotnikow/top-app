import cn from 'classnames'
import { FunctionComponent, useState, useRef, KeyboardEvent } from 'react'
import styles from './Layout.module.css'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import { LayoutProps } from './Layout.props'
import { AppContextProvider, IAppContext } from 'context/app.context'
import { Up } from '../components'

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
    }
    setIsSkipLinkDisplayed(false)
  }
  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />

      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>

      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
