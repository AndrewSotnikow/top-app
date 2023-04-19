import { MenuProps } from './Menu.props'
import cn from 'classnames'
import { useContext } from 'react'

import styles from './Header.module.css'
import { AppContext } from 'context/app.context'

export const Menu = ({ ...props }: MenuProps): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  return (
    <div>
      {menu.map((m) => (
        <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
      ))}
    </div>
  )
}
