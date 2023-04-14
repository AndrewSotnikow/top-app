import { HeaderProps } from './Footer.props'
import cn from 'classnames'

import styles from './Footer.module.css'

import { format } from 'date-fns'

export const Footer = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      OwlTop © 2022 - {format(new Date(), 'yyyy')} All rights reserved
    </footer>
  )
}
