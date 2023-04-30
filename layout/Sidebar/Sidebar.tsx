import cn from 'classnames'
import { Menu } from 'layout/Menu/Menu'
import Logo from '../logo.svg'
import styles from './Sidebar.module.css'
import { ISidebarProps } from './Sidebar.props'
import { Search } from '@/components/Search/Search'
import Link from 'next/link'

export const Sidebar = ({
  className,
  ...props
}: ISidebarProps): JSX.Element => {
  return (
    <aside className={cn(className, styles.sidebar)} {...props} role='m'>
      <Link href='/'>
        <Logo className={styles.logo} />
      </Link>
      <Search />
      <Menu />
    </aside>
  )
}
