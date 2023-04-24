import { MenuProps } from './Menu.props'
import cn from 'classnames'

import { useContext } from 'react'
import { AppContext } from 'context/app.context'

import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Menu.module.css'

import { FirstLevelMenuItem, PageItem } from 'interface/menu.interface'
import { firstLevelMenu } from 'helpers/helpers'

import { motion } from 'framer-motion'

export const Menu = ({ ...props }: MenuProps): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)

  const router = useRouter()

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened
          }
          return m
        })
      )
  }

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
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
    hidden: { opacity: 0, height: 0 },
  }

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((menu) => (
          <div key={menu.id}>
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
          </div>
        ))}
      </>
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
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
              >
                {item._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(item.pages, menuItem.route)}
              </motion.div>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <motion.div key={page._id.toString()} variants={variantsChildren}>
        <Link
          href={`/${route}/${page.alias}`}
          key={page._id.toString()}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]:
              `/${route}/${page.alias}` == router.asPath,
          })}
        >
          {page.category}
        </Link>
      </motion.div>
    ))
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
