import { HeaderProps } from './Footer.props'
import cn from 'classnames'

import styles from './Header.module.css'

export const Footer = ({ ...props }: HeaderProps): JSX.Element => {
  return <div {...props}>Header</div>
}
