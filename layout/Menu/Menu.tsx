import { MenuProps } from './Menu.props'
import cn from 'classnames'
import { useContext } from 'react'

import styles from './Menu.module.css'

import { AppContext } from 'context/app.context'
import { FirstLevelMenuItem, PageItem } from 'interface/menu.interface'
import CourseIcon from '@/public/svg/courses.svg'
import ServiceIcon from '@/public/svg/services.svg'
import BooksIcon from '@/public/svg/books.svg'
import ProductsIcon from '@/public/svg/products.svg'
import { TopLevelCategory } from 'interface'
import Link from 'next/link'
import { useRouter } from 'next/router'

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CourseIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'courses',
    name: 'Сервисы',
    icon: <ServiceIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'courses',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'courses',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
]

export const Menu = ({ ...props }: MenuProps): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)

  const router = useRouter()

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
            item.pages.map((p) => p.alias.includes(router.asPath.split('/')[2]))
          ) {
            item.isOpened = true
          }
          return (
            <li key={item._id.secondCategory}>
              <div className={styles.secondLevel}>
                {item._id.secondCategory}
              </div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpened]: item.isOpened,
                })}
              >
                {buildThirdLevel(item.pages, menuItem.route)}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <Link
        href={`/${route}/${page.alias}`}
        key={page._id.toString()}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: true,
        })}
      >
        {page.category}
      </Link>
    ))
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
