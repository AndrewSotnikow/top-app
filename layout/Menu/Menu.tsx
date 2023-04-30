import { MenuProps } from './Menu.props'
import cn from 'classnames'

import { useContext, KeyboardEvent, useState } from 'react'
import { AppContext } from 'context/app.context'

import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Menu.module.css'

import { FirstLevelMenuItem, PageItem } from 'interface/menu.interface'
import { firstLevelMenu } from 'helpers/helpers'

import { motion, useReducedMotion } from 'framer-motion'

export const Menu = ({ ...props }: MenuProps): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            setAnnounce(m.isOpened ? 'closed' : 'opened')
            m.isOpened = !m.isOpened
          }
          return m
        })
      )
  }
  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault()
      openSecondLevel(secondCategory)
    }
  }

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: { marginBottom: 0 },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'fit-content',
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  }

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((menu) => (
          <li key={menu.route} aria-expanded={menu.id == firstCategory}>
            <Link href={`/${menu.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menu.id == firstCategory,
                })}
              >
                {menu.icon} <span>{menu.name}</span>
              </div>
            </Link>

            {menu.id == firstCategory && buildSecondLevel(menu)}
          </li>
        ))}
      </ul>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((item) => {
          if (
            item.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            item.isOpened = true
          }
          return (
            <li key={item._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, item._id.secondCategory)
                }
                aria-expanded={item.isOpened}
              >
                {item._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(
                  item.pages,
                  menuItem.route,
                  item.isOpened ?? false
                )}
              </motion.ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((page) => (
      <motion.li key={page._id.toString()} variants={variantsChildren}>
        <Link
          href={`/${route}/${page.alias}`}
          key={page._id.toString()}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]:
              `/${route}/${page.alias}` == router.asPath,
          })}
          tabIndex={isOpened ? 0 : -1}
          aria-current={
            `/${route}/${page.alias}` == router.asPath ? 'page' : false
          }
        >
          {page.category}
        </Link>
      </motion.li>
    ))
  }

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && (
        <span className='visuallyHidden'>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  )
}
