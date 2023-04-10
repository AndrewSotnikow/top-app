import { HtagProps } from './Htag.props'

import styles from './Htag.module.css'

export const Htag = ({ tag, children }: HtagProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return <h1 className={styles.h1}>{children}</h1>
    case 'h2':
      return <h1 className={styles.h1}>{children}</h1>
    case 'h3':
      return <h1 className={styles.h1}>{children}</h1>
    default:
      return <></>
  }
}
