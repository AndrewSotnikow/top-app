import { SidebarProps } from './Sidebar.props'
import cn from 'classnames'

import styles from './Paragraph.module.css'
import { Menu } from 'layout/Menu/Menu'

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  )
}
